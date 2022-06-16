/**
 * Données initiales du jeu
 */
//On crée les carrés
let A = {
    x: 150,
    y: 150,
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

const aabbMode = 'collision'

/**
 * Exécutée une seule fois, au chargement
 */
function LoadGame(canvas, context) {
    screen.h = canvas.height
    screen.w = canvas.width

    // Le carré B sera au centre, immobile (le carré A se déplace à volonté)
    B.x = screen.w / 2 - B.width / 2
    B.y = screen.h / 2 - B.height / 2
    // on définit les valeurs min et max des coordonnées de B
    B.x_min = B.x
    B.x_max = B.x + B.width
    B.y_min = B.y
    B.y_max = B.y + B.height
}

/**
 * Exécutée perpétuellement pour mettre à jour les données
 */
function UpdateGame(deltaTime) {
    // on définit les valeurs min et max des coordonnées de A
    A.x_min = A.x
    A.x_max = A.x + A.width
    A.y_min = A.y
    A.y_max = A.y + A.height

    // Prise en compte des mouvements à partir des touches de direction et dans les limites de l'écran
    if (isKeyDown('ArrowUp') && A.y > 0) {
        A.y -= 10
    }
    if (isKeyDown('ArrowDown') && A.y_max < screen.h) {
        A.y += 10
    }
    if (isKeyDown('ArrowLeft') && A.x_min > 0) {
        A.x -= 10
    }
    if (isKeyDown('ArrowRight') && A.x_max < screen.w) {
        A.x += 10
    }

    // On utilise le helper AABB pour repérer les collisions, si vous avez bien suivi le cours vous savez déjà comment il fonctionne
    // Cela permet de définir l'état de A qui détermine sa couleur
    A.touch = aabb(A, B)
}

/**
 * Exécutée perpétuellement pour dessiner la frame actuelle
 */
function DrawGame(context) {
    drawRect(context, 'B', 'DeepSkyBlue')

    drawRectMinMax(context, 'B')

    drawCollisionLines(context)

    drawRect(context, 'A', A.touch ? 'FireBrick' : 'Lightgreen')

    drawRectMinMax(context, 'A')

    context.textBaseline = 'hanging'
    context.font = '18px sans-serif'
    drawLeftText(context)
    drawRightText(context)
}

function drawRect(context, rectName, color) {
    context.textBaseline = 'middle'
    context.textAlign = 'center'
    context.font = '60px sans-serif'
    context.fillStyle = color
    let rect = rectName === 'A' ? A : B

    context.fillRect(rect.x, rect.y, rect.width, rect.height)
    context.fillStyle = 'Black'
    context.fillText(rectName, rect.x + rect.width / 2, rect.y + rect.height / 2)
}

function drawCollisionLines(context) {
    let colorFor = condition => condition ? 'red' : 'white'

    context.fillStyle = colorFor(A.x_min <= B.x_max)
    context.fillRect(B.x_max, 0, 1, screen.h)

    context.fillStyle = colorFor(B.x_min <= A.x_max)
    context.fillRect(B.x_min, 0, 1, screen.h)

    context.fillStyle = colorFor(A.y_min <= B.y_max)
    context.fillRect(0, B.y_max, screen.w, 1)

    context.fillStyle = colorFor(B.y_min <= A.y_max)
    context.fillRect(0, B.y_min, screen.w, 1)
}

function drawLeftText(context) {
    let colorFor = condition => condition ? 'red' : 'white'
    context.textAlign = 'left'

    context.fillStyle = colorFor(A.x_min <= B.x_max)
    context.fillText(`A.x_min <= B.x_max = ${emojiFor(A.x_min <= B.x_max)} &&`, 5, 5)

    context.fillStyle = colorFor(B.x_min <= A.x_max)
    context.fillText(`B.x_min <= A.x_max = ${emojiFor(B.x_min <= A.x_max)} &&`, 5, 28)

    context.fillStyle = colorFor(A.y_min <= B.y_max)
    context.fillText(`A.y_min <= B.y_max = ${emojiFor(A.y_min <= B.y_max)} &&`, 5, 51)

    context.fillStyle = colorFor(B.y_min <= A.y_max)
    context.fillText(`B.y_min <= A.y_max = ${emojiFor(B.y_min <= A.y_max)}`, 5, 74)

    context.fillStyle = colorFor(aabb(A, B))
    context.fillText(`                  collision == ${emojiFor(aabb(A, B))}`, 5, 97)
}

function drawRightText(context) {
    let colorFor = condition => condition ? 'chartreuse' : 'white';
    context.textAlign = 'right'

    context.fillStyle = colorFor(A.x_max < B.x_min)
    context.fillText(`A.x_max < B.x_min = ${emojiFor(A.x_max < B.x_min)} ||`, screen.w - 5, 5)

    context.fillStyle = colorFor(B.x_max < A.x_min)
    context.fillText(`B.x_max < A.x_min = ${emojiFor(B.x_max < A.x_min)} ||`, screen.w - 5, 28)

    context.fillStyle = colorFor(A.y_max < B.y_min)
    context.fillText(`A.y_max < B.y_min = ${emojiFor(A.y_max < B.y_min)} ||`, screen.w - 5, 51)

    context.fillStyle = colorFor(B.y_max < A.y_min)
    context.fillText(`B.y_max < A.y_min = ${emojiFor(B.y_max < A.y_min)}   `, screen.w - 5, 74)

    context.fillStyle = colorFor(!aabb(A, B))
    context.fillText(`noCollision == ${emojiFor(!aabb(A, B))}   `, screen.w - 5, 97)
}

function drawRectMinMax(context, rectName) {
    context.save();

    context.fillStyle = 'black'
    context.font = '15px sans-serif'
    context.textAlign = "center";
    let rect = rectName === 'A' ? A : B

    context.fillText('y_min', rect.x_min + rect.width / 2, rect.y_min + 7)
    context.fillText('y_max', rect.x_min + rect.width / 2, rect.y_max - 7)

    context.translate(rect.x_max, rect.y_min);
    context.rotate(Math.PI/2);
    context.fillText('x_min',rect.width / 2, rect.height-7);
    context.fillText('x_max',rect.width / 2, 7);

    context.restore();
}

function emojiFor(condition) {
    return condition ? '✅' : '❌'
}