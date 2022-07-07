/**
 * Exécutée une seule fois, au chargement
 */
function LoadGame(canvas, context) {
    // Interface
    screen.width = canvas.width;
    screen.height = canvas.height;

    // Cercles
    B.x = screen.width / 2;
    B.y = screen.height / 3;

    Abis.x = Abis.r + 10;
    Abis.y = screen.height - Bbis.r - 10;

    Bbis.x = screen.width - Bbis.r - 10;
    Bbis.y = screen.height - Bbis.r - 10;
}

/**
 * Exécutée perpétuellement pour mettre à jour les données
 */
function UpdateGame(deltaTime) {
    distanceAB = Math.hypot(Math.abs(A.x - B.x), Math.abs(A.y - B.y));

    // Actualisation de l'état de B (détection de collision)
    B.touched = circleCollision(A, B);

    // Actualisation du point de collision
    if (B.touched) {
        collisionPointsUpdate();
    }

    // Prise en compte des mouvements à partir des touches de direction et dans les limites de l'écran
    if (isKeyDown('ArrowUp') && A.y > A.r + move && !(B.touched && A.y > B.y)) {
        A.y -= move;
    }
    if (isKeyDown('ArrowDown') && A.y < screen.height * 2 / 3 - A.r - move && !(B.touched && A.y < B.y)) {
        A.y += move;
    }
    if (isKeyDown('ArrowLeft') && A.x > A.r + move && !(B.touched && A.x > B.x)) {
        A.x -= move;
    }
    if (isKeyDown('ArrowRight') && A.x < screen.width - A.r - move && !(B.touched && A.x < B.x)) {
        A.x += move;
    }

    // Actualisation de la position des cercles bis
    circleBisUpdate();
}

/**
 * Exécutée perpétuellement pour dessiner la frame actuelle
 */
function DrawGame(context) {
    // Partie haute
    drawCircle(context, B);
    drawCircle(context, A);
    if (B.touched) {
        drawCircle(context, C);
    }

    // Partie basse
    drawCircle(context, Bbis);
    drawCircle(context, Abis);
    if (B.touched) {
        drawCircle(context, Cbis);
    }

    drawLines(context);

    drawText(context);

    drawSep(context);
}