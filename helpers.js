/**
 * Maths
 */

/**
 * Circonscrit un nombre entre un minimum et un maximum
 * @param num
 * @param min
 * @param max
 * @returns {number}
 */
clamp = (min, num, max) => Math.min(Math.max(min, num), max);

/**
 * Retourne un booléen désignant si un nombre est inclus ou non entre deux autres
 * @param a
 * @param num
 * @param b
 * @param including
 * @returns {boolean}
 */
isNumberBetween = (a, num, b, including = true) => {
    let min = Math.min(a, b),
        max = Math.max(a, b);

    return including ? this >= min && this <= max : this > min && this < max;
}

/**
 * Retour l'angle radian entre deux points
 * @param pointA
 * @param pointB
 * @returns {number}
 */
angleBetweenPoints = (pointA, pointB) => Math.atan2(pointA.y - pointB.y, pointA.x - pointB.x)

/**
 * Génère un nombre aléatoire entre un minimum et un maximum
 * @param min
 * @param max
 * @returns {number}
 */
randomNumber = function (min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)

    return Math.floor(Math.random() * (max - min +1)) + min
}



/**
 * Géométries
 */

/**
 * Retourne un booléen indiquant si un point est dans un rectangle
 * @param rect
 * @param point
 * @returns {boolean}
 */
rectContainsPoint = (rect, point) =>
    point.x >= rect.x &&
    point.x <= rect.x + rect.width &&
    point.y >= rect.y &&
    point.y <= rect.y + rect.height

/**
 * Retourne un booléen indiquant si un point est dans un cercle
 * @param circle
 * @param point
 * @returns {boolean}
 */
circleContainsPoint = (circle, point) =>
    Math.abs(Math.hypot(point.x - circle.center.x, point.y - circle.center.y)) <= circle.size



/**
 * Collisions
 */

/**
 * Retourne un booléen indiquant si le rectangle A touche le rectangle B
 * @param rectA
 * @param rectB
 * @returns {boolean}
 */
aabb = (rectA, rectB) =>
    !(rectA.x > rectB.x + rectB.width   ||
        rectA.x + rectA.width < rectB.x ||
        rectA.y > rectB.y + rectB.height  ||
        rectA.y + rectA.height < rectB.y)

segmentProjection = (pointA, pointB, pointC) =>
{
    let ACx = pointC.x-pointA.x;
    let ACy = pointC.y-pointA.y;
    let ABx = pointB.x-pointA.x;
    let ABy = pointB.y-pointA.y;
    let BCx = pointC.x-pointB.x;
    let BCy = pointC.y-pointB.y;
    let s1 = (ACx*ABx) + (ACy*ABy);
    let s2 = (BCx*ABx) + (BCy*ABy);

    return s1*s2>0
}


/**
 * Formes géométriques
 */

/**
 * Génère un point en 2 dimensions
 * @param x
 * @param y
 * @returns {{x: number, y: number}}
 */
point2 = (x, y) => ({x, y})

/**
 * Génères un rectangle
 * @param x
 * @param y
 * @param width
 * @param height
 * @returns {{x: number, width: number, y: number, height: number}}
 */
rect = (x, y, width, height) => ({x, y, width, height})

/**
 * Génères un cercle
 * @param center
 * @param radius
 * @returns {{{x: number, y: number}, radius: number}}
 */
circle = (center, radius) => ({center, radius})



/**
 * Intégration des fonctions précédente dans les types primaires
 */

/**
 * Retourne un booléen désignant si le nombre est inclus ou non entre deux autres
 * @param a
 * @param b
 * @param including
 * @returns {boolean}
 */
Number.prototype.isBetween = function (a, b, including) { return isNumberBetween(a, this, b, including) }

/**
 * Circonscrit le nombre entre un minimum et un maximum
 * @param min
 * @param max
 * @returns {number}
 */
Number.prototype.clamp = function (min, max) { return clamp(min, this, max) }


/**
 * Boolean class helpers
 */

/**
 * Génères un booléen aléatoire
 * @param _
 * @returns {boolean}
 */
Boolean.random = _ => Math.random() < .5

/**
 * Extension du CanvasRenderingContext2D
 */
CanvasRenderingContext2D.prototype.drawPolygon = function (points) {
    this.beginPath()
    this.moveTo(points[0].x, points[0].y)
    points.slice(1).forEach(point => this.lineTo(point.x, point.y))
    this.closePath()
}

CanvasRenderingContext2D.prototype.drawCircle = function (center, radius, startAngle = 0, angle = 2*Math.PI, antiClockWise = true) {
    this.beginPath()
    this.arc(center.x, center.y, radius, startAngle, angle, antiClockWise)
}

CanvasRenderingContext2D.prototype.drawLine = function (from, to) {
    this.beginPath();
    this.moveTo(from.x, from.y);
    this.lineTo(to.x, to.y);
}
