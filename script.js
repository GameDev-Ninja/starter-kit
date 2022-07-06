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
