/**
 * Données initiales du jeu
 */

/** Chargement et positionnement du logo Game-Dev.Ninja */
let A = {// Cercle déplçable
    x: 50,
    y: 50,
    r: 40,
    name: "A"
}
let B = {// Cercle fixe
    x: 0,
    y: 0,
    r: 60,
    name: "B",
    touched: false

}
let C = {// Point de contact
    x: 0,
    y: 0,
    r: 0,
    name: "C"
}
const screen = {
    width: 0,
    heigth: 0
}
/** Fin du chargement et positionnement du logo Game-Dev.Ninja */


/**
 * Exécutée une seule fois, au chargement
 */
function LoadGame(canvas, context) {
    screen.width = canvas.width
    screen.height = canvas.height

    B.x = screen.width / 2
    B.y = screen.height / 2
}

/**
 * Exécutée perpétuellement pour mettre à jour les données
 */
function UpdateGame(deltaTime) {
    B.touched = circleCollision(A,B)
    // Prise en compte des mouvements à partir des touches de direction et dans les limites de l'écran
    if (isKeyDown('ArrowUp') && A.y > A.r && !(B.touched && A.y > B.y))  {
        A.y -= 6
    }
    if (isKeyDown('ArrowDown') && A.y < screen.height - A.r && !(B.touched && A.y < B.y)) {
        A.y += 6
    }
    if (isKeyDown('ArrowLeft') && A.x > A.r && !(B.touched && A.x > B.x)) {
        A.x -= 6
    }
    if (isKeyDown('ArrowRight') && A.x < screen.width - A.r && !(B.touched && A.x < B.x)) {
        A.x += 6
    }
}

/**
 * Exécutée perpétuellement pour dessiner la frame actuelle
 */
function DrawGame(context) {
    drawCircle(context, B)
    drawCircle(context, A)
    if(B.touched){ drawContactPoint(context, A, B, C) }
}

/**
 * Fonctions diverses
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
 * Affiche un "point" au niveau de la zone de contact entre 2 cercles A et B
 * @param {*} context
 * @param {*} A 
 * @param {*} B 
 * @param {*} C
 */
function drawContactPoint(context, A, B, C){
    C.x = A.x + (A.r * (B.x - A.x) / (A.r + B.r))
    C.y = A.y + (A.r * (B.y - A.y) / (A.r + B.r))
    C.r = 5

    drawCircle(context, C)
}

/**
 * Dessine un cercle à partir d'un objet cercle (couleurs prédéfinies)
 * @param {*} context 
 * @param {*} circle 
 */
function drawCircle(context, circle){
    if(circle.name === "A"){ context.fillStyle = "DeepSkyBlue" }
    else if(circle.name === "C"){ context.fillStyle = "White" }
    else if(circle.touched){ context.fillStyle = "FireBrick" }
    else{ context.fillStyle = "LightGreen" }

    context.beginPath()
    context.arc(circle.x, circle.y, circle.r, 0, 2*Math.PI)
    context.closePath()
    context.fill()

    if(circle.name !== "C"){
        context.textBaseline = "middle"
        context.textAlign = "center"
        context.font = "35px sans-serif"
        context.fillStyle = "black"
        context.fillText(circle.name, circle.x, circle.y)
    }
}