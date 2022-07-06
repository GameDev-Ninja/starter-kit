/**
 * Dessine un cercle à partir d'un objet cercle (couleurs prédéfinies)
 * @param {*} context 
 * @param {*} circle 
 */
 function drawCircle(context, circle){
  context.fillStyle = circle.color
  if(circle.touched){ context.fillStyle = "FireBrick" }

  context.beginPath()
  context.arc(circle.x, circle.y, circle.r, 0, 2*Math.PI)
  context.fill()
  context.closePath()

  if(circle.name === "A" || circle.name === "B"){
      context.textBaseline = "middle"
      context.textAlign = "center"
      context.font = "35px sans-serif"
      context.fillStyle = "black"
      context.fillText(circle.name, circle.x, circle.y)
  }
}

/**
* Dessine une "ligne"
* @param {*} context 
* @param {*} line 
*/
function drawLine(context, line){
  context.fillStyle = line.color
  context.fillRect(line.x, line.y, line.l, context.lineHeight)
}