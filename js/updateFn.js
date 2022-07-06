/**
 * Actualise la position des points de collision entre cercles
 */
 function collisionPointsUpdate(){
  C.x = A.x + (A.r * (B.x - A.x) / (A.r + B.r))
  C.y = A.y + (A.r * (B.y - A.y) / (A.r + B.r))
  C.r = 5

  Cbis.x = Abis.x + (Abis.r * (Bbis.x - Abis.x) / (Abis.r + Bbis.r))
  Cbis.y = Bbis.y
  Cbis.r = 5
}

/**
* Actualise la position des cercles dans la partie inférieure
*/
function circleBisUpdate(){
  let border = (Abis.r + Bbis.r)
  let base = 10 + Abis.r
  let proportion = 1-(Math.hypot(Math.abs(A.x - B.x), Math.abs(A.y - B.y)) - border) / (Math.hypot(B.x, B.y) - border)
  Abis.x = base + (proportion * (screen.width - 10 - Bbis.r * 2 - base - Abis.r))
}

/**
* Actualise la position et la longueur des lignes de la partie inférieure
*/
function distanceCentersUpdate(){
  distanceCenters.x = Abis.x
  distanceCenters.l = Bbis.x - Abis.x
}

/**
 * Vérifie si 2 cercles sont en collision
 * @param {*} A 
 * @param {*} B 
 * @returns bool
 */
 function circleCollision(A, B){
  return  Math.hypot( Math.abs(A.x - B.x), Math.abs(A.y - B.y) ) <= A.r + B.r
}