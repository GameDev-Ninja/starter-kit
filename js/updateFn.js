/**
 * Actualise la position des points de collision entre cercles
 */
function collisionPointsUpdate() {
  C.x = A.x + (A.r * (B.x - A.x) / (A.r + B.r));
  C.y = A.y + (A.r * (B.y - A.y) / (A.r + B.r));
  C.r = 5;

  Cbis.x = Abis.x + (Abis.r * (Bbis.x - Abis.x) / (Abis.r + Bbis.r));
  Cbis.y = Bbis.y;
  Cbis.r = 5;
}

/**
 * Actualise la position des cercles dans la partie inférieure
 */
function circleBisUpdate() {
  Abis.x = Bbis.x - distanceAB;
}

/**
 * Vérifie si 2 cercles sont en collision
 * @param {*} A 
 * @param {*} B 
 * @returns bool
 */
function circleCollision(A, B) {
  return distanceAB <= A.r + B.r;
}