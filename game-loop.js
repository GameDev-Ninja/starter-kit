// Pour masquer les FPS : mettre false
const displayFPS = true
// Couleur de dessin par défaut, se référer au tableau de couleurs
// présent sur cette page: https://developer.mozilla.org/fr/docs/Web/CSS/color_value#les_mots-cl%C3%A9s
const defaultFillColor = 'white'

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
    canvasCtx.fillStyle = defaultFillColor;
    DrawGame(canvasCtx)

    // Affichage des FPS si nécessaire
    if (displayFPS) {
        canvasCtx.fillStyle = 'white'
        canvasCtx.font = '20pt sans-serif'
        let FPS = Math.round(1000 / dt) / 1000
        canvasCtx.fillText(`FPS: ${FPS}`, canvas.width - 150, 30)
    }

    // Bouclage
    requestAnimationFrame(run)
}

/**
 * Préchargement du jeu et lancement
 */
(function () {
    // Désactivation de l'anti-aliasing pour les jeux pixel-art
    canvasCtx.imageSmoothingEnabled = false
    LoadGame(canvas, canvasCtx)
    requestAnimationFrame(run)
})()
