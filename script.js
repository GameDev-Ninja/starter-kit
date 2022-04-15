/**
 * Données initiales du jeu
 */

let logo = {
    image: new Image(),
    x: 0,
    y: 0
}
logo.image.src = './assets/images/logo.png'

/**
 * Exécutée une seule fois, au chargement
 */
function LoadGame(canvas, context) {
    logo.x = (canvas.width - logo.image.naturalWidth) / 2
    logo.y = (canvas.height - logo.image.naturalHeight) / 2
}

/**
 * Exécutée perpétuellement pour mettre à jour les données
 */
function UpdateGame(deltaTime) {

}

/**
 * Exécutée perpétuellement pour dessiner la frame actuelle
 */
function DrawGame(canvasContext) {
    canvasContext.drawImage(logo.image, 0, 0, logo.image.naturalWidth, logo.image.naturalHeight, logo.x, logo.y, logo.image.naturalWidth, logo.image.naturalHeight)
}
