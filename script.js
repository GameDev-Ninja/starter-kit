/**
 * Données initiales du jeu
 */
//On crée les carrés
let A = {
    x: 0,
    y: 0,
    width: 150,
    height: 150,

    // Utilisé pour colorer notre carré selon qu'il est en "collision" ou pas
    touch: false 
}
let B = {
    x: 0,
    y: 0,
    width: 150,
    height: 150,
}
const screen = {
    h: 0, // hauteur de l'écran de jeu
    w: 0, // Largeur de l'écran de jeu
}
/**
 * Exécutée une seule fois, au chargement
 */
function LoadGame(canvas, context) {
    screen.h = canvas.height
    screen.w = canvas.width

    // Le carré B sera au centre, immobile (le carré A se déplace à volonté)
    B.x = screen.w/2 - B.width/2
    B.y = screen.h/2 - B.height/2
    // on définit les valeurs min et max des coordonées de B
    B.x_min = B.x
    B.x_max = B.x + B.width
    B.y_min = B.y
    B.y_max = B.y + B.height
}

/**
 * Exécutée perpétuellement pour mettre à jour les données
 */
function UpdateGame(deltaTime) {
    // on définit les valeurs min et max des coordonées de A
    A.x_min = A.x
    A.x_max = A.x + A.width
    A.y_min = A.y
    A.y_max = A.y + A.height

    // Prise en compte des mouvements à partir des touches de direction et dans les limites de l'écran
    if(isKeyDown('ArrowUp') && A.y > 0){ A.y -= 10 }
    if(isKeyDown('ArrowDown') && A.y_max < screen.h ){ A.y += 10 }
    if(isKeyDown('ArrowLeft') && A.x_min > 0){ A.x -= 10 }
    if(isKeyDown('ArrowRight') && A.x_max < screen.w){ A.x += 10 }

    // On utilise le helper AABB pour repérer les collisions, si vous avez bien suivi le cours vous savez déjà comment il fonctionne
    // Cela permet de définir l'état de A qui détermine sa couleur
    if(aabb(A,B)){ A.touch = true }
    else{ A.touch = false }

}

/**
 * Exécutée perpétuellement pour dessiner la frame actuelle
 */
function DrawGame(context) {
    context.textBaseline = 'middle'
    context.textAlign = 'center'
    context.font = '60px sans-serif'

    // Dessin de B
    context.fillStyle = 'DeepSkyBlue'
    context.fillRect(B.x, B.y, B.width, B.height)
    context.fillStyle = 'Black'
    context.fillText('B', B.x+B.width/2, B.y+B.height/2 )
    
    // Dessin de A
    context.fillStyle = A.touch? 'fireBrick': 'lightgreen' // définition de la couleur de A selon les collisions
    context.fillRect(A.x, A.y, A.width, A.height)
    context.fillStyle = 'Black'
    context.fillText('A', A.x+A.width/2, A.y+A.height/2 )

    // Dessin des repères et des conditions
    context.textBaseline = 'hanging'
    context.textAlign = 'left'
    context.font = '15px sans-serif'


    context.fillStyle = A.x_min <= B.x_max? 'red' : 'white'
    context.fillRect(B.x_max, 0, 1, screen.h)
    context.fillText(`A.x_min <= B.x_max = ${A.x_min <= B.x_max} &&`, 5, 5)

    context.fillStyle = B.x_min <= A.x_max? 'red' : 'white'
    context.fillRect(B.x_min, 0, 1, screen.h)
    context.fillText(`B.x_min <= A.x_max = ${B.x_min <= A.x_max} &&`, 5, 25)

    context.fillStyle = A.y_min <= B.y_max? 'red' : 'white'
    context.fillRect(0, B.y_max, screen.w, 1)
    context.fillText(`A.y_min <= B.y_max = ${A.y_min <= B.y_max} &&`, 5, 45)

    context.fillStyle = B.y_min <= A.y_max? 'red' : 'white'
    context.fillRect(0, B.y_min, screen.w, 1)
    context.fillText(`B.y_min <= A.y_max = ${B.y_min <= A.y_max}`, 5, 65)

    context.fillStyle = aabb(A,B)? 'red' : 'white'
    context.fillText(`collision == ${aabb(A,B)}`, 5, 85)

    context.textAlign = 'right'
    context.fillStyle = A.x_max < B.x_min? 'chartreuse' : 'white'
    context.fillText(`A.x_max < B.x_min = ${A.x_max < B.x_min} ||`, screen.w-5, 5)

    context.fillStyle = A.x_max < B.x_min? 'chartreuse' : 'white'
    context.fillText(`A.x_max < B.x_min = ${A.x_max < B.x_min} ||`, screen.w-5, 5)

    context.fillStyle = B.x_max < A.x_min? 'chartreuse' : 'white'
    context.fillText(`B.x_max < A.x_min = ${B.x_max < A.x_min} ||`, screen.w-5, 25)

    context.fillStyle = A.y_max < B.y_min? 'chartreuse' : 'white'
    context.fillText(`A.y_max < B.y_min = ${A.y_max < B.y_min} ||`, screen.w-5, 45)

    context.fillStyle = B.y_max < A.y_min? 'chartreuse' : 'white'
    context.fillText(`B.y_max < A.y_min = ${B.y_max < A.y_min}`, screen.w-5, 65)

    context.fillStyle = !aabb(A,B)? 'chartreuse' : 'white'
    context.fillText(`noCollision == ${!aabb(A,B)}`, screen.w-5, 85)
}
