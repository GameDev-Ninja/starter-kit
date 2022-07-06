/**
 * Données initiales du jeu
 */
/******      Les cercles      ******/
let A = {// Cercle déplçable
    x: 50,
    y: 50,
    r: 40,
    name: "A",
    color: "DeepSkyBlue"
}
let B = {// Cercle fixe
    x: 0,
    y: 0,
    r: 60,
    name: "B",
    color: "LightGreen",
    touched: false
}
let C = {// Point de contact
    x: 0,
    y: 0,
    r: 0,
    name: "C",
    color: "White"
}

/******      Les Cercles bis (représentation horizontale des écarts)      ******/
let Abis = {
    x: 0,
    y: 0,
    r: 40,
    color: "DeepSkyBlue"
}
let Bbis = {
    x: 0,
    y: 0,
    r: 60,
    color: "LightGreen",
    touched: false
}
let Cbis = {// Point de contact
    x: 0,
    y: 0,
    r: 0,
    color: "White"
}

/******      Lignes de longueurs (représentation horizontale des écarts)      ******/
let distanceCenters = {
    x: 0,
    y: 0,
    l: 0,
    color: "LightSlateGray"
}
let ARay = {
    x: 0,
    y: 0,
    l: 0,
    color: "MediumSlateBlue"
}
let BRay = {
    x: 0,
    y: 0,
    l: 0,
    color: "DarkGreen"
}
/******      Divers      ******/
const screen = {
    width: 0,
    heigth: 0
}

let lineHeight = 2

// Sep line
let sep = {
    x: 0,
    y: 0,
    l: 0,
    color: "white"
}

// Pixels / moves
const move = 6

/**
 * Exécutée une seule fois, au chargement
 */
function LoadGame(canvas, context) {
    // Interface
    context.lineHeight = lineHeight
    screen.width = canvas.width
    screen.height = canvas.height
    
    sep.x = 0
    sep.y = screen.height * 2/3
    sep.l= screen.width
    
    // Cercles
    B.x = screen.width / 2
    B.y = screen.height / 3

    Abis.x = 10 + Abis.r
    Abis.y = screen.height - Bbis.r - 10

    Bbis.x = screen.width - 10 - Bbis.r
    Bbis.y = screen.height - Bbis.r - 10

    // Lignes de mesure
    distanceCenters.x = Abis.x
    distanceCenters.y = Bbis.y - Bbis.r - 5
    distanceCenters.l = Bbis.x - Abis.x
}

/**
 * Exécutée perpétuellement pour mettre à jour les données
 */
function UpdateGame(deltaTime) {
    // Vérification d'une collision entre A et B
    B.touched = circleCollision(A,B)

    // Actualisation du point de collision
    if(B.touched){
        collisionPointsUpdate()
    }
    

    // Prise en compte des mouvements à partir des touches de direction et dans les limites de l'écran
    if (isKeyDown('ArrowUp') && A.y > A.r + move && !(B.touched && A.y > B.y))  {
        A.y -= move
    }
    if (isKeyDown('ArrowDown') && A.y < screen.height * 2/3 - A.r - move && !(B.touched && A.y < B.y)) {
        A.y += move
    }
    if (isKeyDown('ArrowLeft') && A.x > A.r + move && !(B.touched && A.x > B.x)) {
        A.x -= move
    }
    if (isKeyDown('ArrowRight') && A.x < screen.width - A.r - move && !(B.touched && A.x < B.x)) {
        A.x += move
    }

    // Actualisation de la position des cercles bis
    circleBisUpdate()

    // Actualisation de la ligne de distance des centre des cercles bis
    distanceCentersUpdate()
    

}

/**
 * Exécutée perpétuellement pour dessiner la frame actuelle
 */
function DrawGame(context) {
    // Partie haute
    drawCircle(context, B)
    drawCircle(context, A)
    if(B.touched){ drawCircle(context, C) }

    // Partie basse
    drawCircle(context, Bbis)
    drawCircle(context, Abis)
    if(B.touched){ drawCircle(context, Cbis) }

    drawLine(context, distanceCenters)




    drawLine(context, sep)
}


/**
 * ********* Fonctions diverses *********
 */

/**
 * Vérifie si 2 cercles sont en collision
 * @param {*} A 
 * @param {*} B 
 * @returns bool
 */
function circleCollision(A, B){
    return Math.hypot(
            Math.abs(A.x - B.x),
            Math.abs(A.y - B.y)
        ) <= A.r + B.r
}

/**
 * Dessine un cercle à partir d'un objet cercle (couleurs prédéfinies)
 * @param {*} context 
 * @param {*} circle 
 */
function drawCircle(context, circle){
    context.fillStyle = circle.color
    if(circle.touched){ context.fillStyle = "FireBrick" }

    context.beginPath()
    context.arc(circle.x, circle.y, circle.r, 0, 2*Math.PI)
    context.fill()
    context.closePath()

    if(circle.name === "A" || circle.name === "B"){
        context.textBaseline = "middle"
        context.textAlign = "center"
        context.font = "35px sans-serif"
        context.fillStyle = "black"
        context.fillText(circle.name, circle.x, circle.y)
    }
}

/**
 * Dessine une "ligne"
 * @param {*} context 
 * @param {*} line 
 */
function drawLine(context, line){
    context.fillStyle = line.color
    context.fillRect(line.x, line.y, line.l, context.lineHeight)
}

/**
 * Actualise la position des points de collision entre cercles
 */
function collisionPointsUpdate(){
    C.x = A.x + (A.r * (B.x - A.x) / (A.r + B.r))
    C.y = A.y + (A.r * (B.y - A.y) / (A.r + B.r))
    C.r = 5

    Cbis.x = Abis.x + (Abis.r * (Bbis.x - Abis.x) / (Abis.r + Bbis.r))
    Cbis.y = Bbis.y
    Cbis.r = 5
}

/**
 * Actualise la position des cercles dans la partie inférieure
 */
function circleBisUpdate(){
    let border = (Abis.r + Bbis.r)
    let base = 10 + Abis.r
    let proportion = 1-(Math.hypot(Math.abs(A.x - B.x), Math.abs(A.y - B.y)) - border) / (Math.hypot(B.x, B.y) - border)
    Abis.x = base + (proportion * (screen.width - 10 - Bbis.r * 2 - base - Abis.r))
}

/**
 * Actualise la position et la longueur des lignes de la partie inférieure
 */
function distanceCentersUpdate(){
    distanceCenters.x = Abis.x
    distanceCenters.l = Bbis.x - Abis.x
}