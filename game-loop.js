// Pour masquer les FPS : mettre false
const displayFPS = true

// Identification de l'écran de jeu
const canvas = document.getElementById("canvas")
// Création du contexte de jeu en 2 dimensions
const canvasCtx = canvas.getContext("2d")

let dtTick = 0

/**
 * Game-loop
 * @param time
 */
function run(time) {
    // Calcul du delta-time
    const dt = (time - dtTick) / 1000

    dtTick = time

    // Mise à jour des données
    UpdateGame(dt)
    // Nettoyage de l'écran
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height)
    // Dessin du nouvel écran de jeu
    DrawGame(canvasCtx)

    // Affichage des FPS si nécessaire
    if (displayFPS) {
        canvasCtx.fillStyle = 'white'
        canvasCtx.font = '20pt sans-serif'
        let FPS = Math.round(1000 / dt) / 1000
        canvasCtx.fillText(`FPS: ${FPS}`, 10, 30)
    }

    // Bouclage
    requestAnimationFrame(run)
}

/**
 * Préchargement du jeu et lancement
 */
(function () {
    // Désactivation de l'anti-aliasing
    canvasCtx.imageSmoothingEnabled = false
    canvasCtx.msImageSmoothingEnabled = false
    canvasCtx.webkitImageSmoothingEnabled = false
    LoadGame(canvas, canvasCtx)
    requestAnimationFrame(run)
})()
