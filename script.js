/**
 * Données initiales du jeu
 */
// zone de jeu
let scr = {
    width: 0,
    height: 0
}

// Hauteur de sol
let fHeight = 0

// Mario !
let M = {
    x: 0,
    y: 0,
    v: 0, // La vélocité verticale, indispensable pour appliquer un effet de gravité.
    size: 10,
}

// La Gravité 
let g = 2

// La force des couisses !
let j = 25

/**
 * Exécutée une seule fois, au chargement
 */
function LoadGame(canvas, ctx) {
    // Interface
    scr.width = canvas.width;
    scr.height = canvas.height;

    // Hauteur de sol
    fHeight = scr.height - 25

    // Mario va au sol, au milieu
    M.x = scr.width/2-M.size/2
    M.y = fHeight - M.size

}

/**
 * Exécutée perpétuellement pour mettre à jour les données
 */
function UpdateGame(deltaTime) {
    // Si besoin on cale Mario au sol à vélocité 0
    if(M.y + M.size > fHeight){
        M.v = 0
        M.y = fHeight - M.size
    }

    // Prise en compte des pressions de touche
    if (isKeyDown('ArrowLeft') && M.x > 0) {
        M.x -= 10
    }
    if (isKeyDown('ArrowRight') && M.x < scr.width - M.size) {
        M.x += 10
    }
    keyUp('ArrowUp', () => {
        console.log(M.v)
        M.v = -j
    })

    if(M.y + M.size < fHeight){
        M.v += g
    }
    M.y += M.v
}

/**
 * Exécutée perpétuellement pour dessiner la frame actuelle
 */
function DrawGame(ctx) {
    drawFloor(ctx)
    drawMario(ctx, M)
}
/**
 * Dessine Mario !
 */
function drawMario(ctx, M){
    ctx.fillStyle = "white"
    ctx.fillRect(M.x, M.y, M.size, M.size)
}

/**
 * Petit sol un peu stylé (pas vraiment lol)
 */
function drawFloor(ctx){
    
    ctx.strokeStyle = "white"
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(0, fHeight)
    ctx.lineTo(scr.width, fHeight)

    // ctx.lineWidth = 1
    for(let i = -25; i < scr.width; i += 15){
        ctx.moveTo(i, scr.height)
        ctx.lineTo(i+25, fHeight)
    }
    ctx.stroke()
}