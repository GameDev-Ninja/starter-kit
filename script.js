/**
 * Données initiales du jeu
 */

/** Chargement et positionnement du logo Game-Dev.Ninja */
let A = {// Cercle déplçable
    x: 25,
    y: 25,
    r: 25,
    name: "A"
}
let B = {// Cercle fixe
    x: 0,
    y: 0,
    r: 45,
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
    // Prise en compte des mouvements à partir des touches de direction et dans les limites de l'écran
    if (isKeyDown('ArrowUp') && A.y > A.r) {
        A.y -= 10
    }
    if (isKeyDown('ArrowDown') && A.y < screen.height - A.r) {
        A.y += 10
    }
    if (isKeyDown('ArrowLeft') && A.x > A.r) {
        A.x -= 10
    }
    if (isKeyDown('ArrowRight') && A.x < screen.width - A.r) {
        A.x += 10
    }
}

/**
 * Exécutée perpétuellement pour dessiner la frame actuelle
 */
function DrawGame(context) {
    drawCircle(context, B)
    drawCircle(context, A)
}

/**********/
function drawCircle(context, circle){
    if(circle.name === "A"){ context.fillStyle = "DeepSkyBlue" }
    else if(circle.name === "C"){ context.fillStyle = "Red" }
    else if(circle.touched){ context.fillStyle = "FireBrick" }
    else{ context.fillStyle = "LightGreen" }

    context.beginPath()
    context.arc(circle.x, circle.y, circle.r, 0, 2*Math.PI)
    context.closePath()
    context.fill()

    if(circle.name !== "C"){
        context.textBaseline = "middle"
        context.textAlign = "center"
        context.font = "25px sans-serif"
        context.fillStyle = "black"
        context.fillText(circle.name, circle.x, circle.y)
    }
}