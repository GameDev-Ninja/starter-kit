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
    height: 0, // hauteur de l'écran de jeu
    width: 0, // Largeur de l'écran de jeu
}

const watermark = {
    image: new Image(),
    x: 0,
    y: 0
}

/**
 * Exécutée une seule fois, au chargement
 */
function LoadGame(canvas, context) {
    screen.height = canvas.height
    screen.width = canvas.width

    // Le carré B sera au centre, immobile (le carré A se déplace à volonté)
    B.x = screen.width / 2 - B.width / 2
    B.y = screen.height/ 2 - B.height / 2
    // on définit les valeurs min et max des coordonnées de B
    B.x_min = B.x
    B.x_max = B.x + B.width
    B.y_min = B.y
    B.y_max = B.y + B.height

    watermark.image.onload = function() {
        watermark.x = screen.width - watermark.image.naturalWidth - 10
        watermark.y = screen.height - watermark.image.naturalHeight - 10
    }
    watermark.image.src = './assets/images/logo.png'
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
    if (isKeyDown('ArrowDown') && A.y_max < screen.height) {
        A.y += 10
    }
    if (isKeyDown('ArrowLeft') && A.x_min > 0) {
        A.x -= 10
    }
    if (isKeyDown('ArrowRight') && A.x_max < screen.width) {
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
    drawWatermark(context)

    drawRect(context, 'B', 'DeepSkyBlue')

    drawRect(context, 'A', A.touch ? 'FireBrick' : 'Lightgreen')

    drawCollisionLines(context)

    context.textBaseline = 'hanging'
    context.font = '18px sans-serif'
    drawCollisionText(context)
    drawNoCollisionText(context)
}

/**
 * Dessine un rectangle et son nom
 * @param context
 * @param rectName
 * @param color
 */
function drawRect(context, rectName, color) {
    context.textBaseline = 'middle'
    context.textAlign = 'center'
    context.font = '60px sans-serif'
    context.fillStyle = color
    let rect = rectName === 'A' ? A : B

    context.fillRect(rect.x, rect.y, rect.width, rect.height)
    context.fillStyle = 'Black'
    context.fillText(rectName, rect.x + rect.width / 2, rect.y + rect.height / 2)

    drawRectMinMaxText(context, rectName)
}

/**
 * Dessine les lignes de collision du rectangle A en pointillés
 * @param context
 */
function drawCollisionLines(context) {
    let colorFor = condition => condition ? 'red' : 'white'
    context.setLineDash([10, 8])

    context.strokeStyle = colorFor(A.x_min <= B.x_max)
    drawLine(context, B.x_max, 0, B.x_max, screen.height)

    context.strokeStyle = colorFor(B.x_min <= A.x_max)
    drawLine(context, B.x_min, 0, B.x_min, screen.height)

    context.strokeStyle = colorFor(A.y_min <= B.y_max)
    drawLine(context, 0, B.y_max, screen.width, B.y_max)

    context.strokeStyle = colorFor(B.y_min <= A.y_max)
    drawLine(context, 0, B.y_min, screen.width, B.y_min)
}

function drawLine(context, fromX, fromY, toX, toY) {
    context.beginPath();
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
}

/**
 * Dessine les conditions au format textuel pour la collision à gauche de l'écran de jeu
 * @param context
 */
function drawCollisionText(context) {
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

/**
 * Dessine les conditions au format textuel pour la "non-collision" à droite de l'écran de jeu
 * @param context
 */
function drawNoCollisionText(context) {
    let colorFor = condition => condition ? 'chartreuse' : 'white';
    context.textAlign = 'right'

    context.fillStyle = colorFor(A.x_max < B.x_min)
    context.fillText(`A.x_max < B.x_min = ${emojiFor(A.x_max < B.x_min)} ||`, screen.width - 5, 5)

    context.fillStyle = colorFor(B.x_max < A.x_min)
    context.fillText(`B.x_max < A.x_min = ${emojiFor(B.x_max < A.x_min)} ||`, screen.width - 5, 28)

    context.fillStyle = colorFor(A.y_max < B.y_min)
    context.fillText(`A.y_max < B.y_min = ${emojiFor(A.y_max < B.y_min)} ||`, screen.width - 5, 51)

    context.fillStyle = colorFor(B.y_max < A.y_min)
    context.fillText(`B.y_max < A.y_min = ${emojiFor(B.y_max < A.y_min)}   `, screen.width - 5, 74)

    context.fillStyle = colorFor(!aabb(A, B))
    context.fillText(`noCollision == ${emojiFor(!aabb(A, B))}   `, screen.width - 5, 97)
}

/**
 * Dessine les repères x_min/max et y_min/max sur les bords d'un rectangle
 * @param context
 * @param rectName
 */
function drawRectMinMaxText(context, rectName) {
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

/**
 * Dessine le logo GameDevNinja en transparence
 * @param context
 */
function drawWatermark(context) {
    context.save();
    context.globalAlpha = 0.5
    context.drawImage(watermark.image, watermark.x, watermark.y)
    context.restore();
}

/**
 * Retourne l'emoji ✅ pour un booléen true, et ❌ pour un booléen false
 * @param condition
 * @returns {string}
 */
function emojiFor(condition) {
    return condition ? '✅' : '❌'
}