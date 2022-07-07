function drawLine(context, fromX, fromY, toX, toY) {
  context.beginPath();
  context.moveTo(fromX, fromY);
  context.lineTo(toX, toY);
  context.stroke();
}

function setLineStyle(context, lineWidth = 1, color = "white", dashStyle = [0, 0]) {
  context.lineWidth = lineWidth;
  context.strokeStyle = color;
  context.setLineDash(dashStyle);
}

/**
 * Dessine un cercle à partir d'un objet cercle
 * @param {*} ctx 
 * @param {*} circle 
 */
function drawCircle(ctx, circle) {
  ctx.fillStyle = circle.color;
  if (circle.touched) { ctx.fillStyle = "FireBrick"; }

  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();

  if (circle.name === "A" || circle.name === "B") {
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.font = "35px sans-serif";
    ctx.fillStyle = "black";
    ctx.fillText(circle.name, circle.x, circle.y);
  }
}

/**
 * Dessine la ligne de séparation
 * @param {*} ctx 
 */
function drawSep(ctx) {
  setLineStyle(ctx)
  drawLine(ctx, 0, screen.height * 2 / 3, screen.width, screen.height * 2 / 3);
}

/**
 * Dessine les lignes de repère et les ligne de distance et rayons
 * @param {*} ctx 
 */
function drawLines(ctx) {
  const dash = [10, 4];

  // A Ray
  setLineStyle(ctx, 3, "FireBrick")
  drawLine(ctx, Abis.x, Abis.y, Abis.x + Abis.r, Abis.y);

  // B Ray
  setLineStyle(ctx, 3, "FireBrick")
  drawLine(ctx, Bbis.x, Abis.y, Bbis.x - Bbis.r, Bbis.y);

  // A Dashed
  drawCircle(ctx, { x: Abis.x, y: Abis.y, r: 3, color: "white" });
  setLineStyle(ctx, 2, "White", dash)
  drawLine(ctx, Abis.x, Abis.y, Abis.x, screen.height * 2 / 3 + 25);

  // B Dashed
  drawCircle(ctx, { x: Bbis.x, y: Bbis.y, r: 3, color: "white" });
  drawLine(ctx, Bbis.x, Bbis.y, Bbis.x, screen.height * 2 / 3 + 25);

  // Distance
  setLineStyle(ctx, 2)
  drawLine(ctx, Abis.x, screen.height * 2 / 3 + 25, Bbis.x, screen.height * 2 / 3 + 25);
}

function drawText(ctx) {
  // Distance sur la ligne
  ctx.textBaseline = "bottom";
  ctx.textAlign = "center";
  ctx.font = "15px sans-serif";
  ctx.fillStyle = "white";
  ctx.fillText(Math.round(distanceAB), (Abis.x + Bbis.x) / 2, screen.height * 2 / 3 + 25);

  ctx.fillStyle = "black";

  // Rayon A
  ctx.fillText(Abis.r, Abis.x + Abis.r / 2, Abis.y);

  // Rayon B
  ctx.fillText(Bbis.r, Bbis.x - Bbis.r / 2, Bbis.y);

  ctx.textAlign = "left";
  ctx.font = "16px sans-serif";
  ctx.fillStyle = "white";
  ctx.fillText(`Distance <= Rayon A + Rayon B ➤ ${emojiFor(B.touched)}`, 10, screen.height * 2 / 3 + 30);
  ctx.fillText(`${Math.round(distanceAB)} <= ${A.r + B.r} ➤ ${emojiFor(B.touched)}`, 10, screen.height * 2 / 3 + 60);
  ctx.fillText(`circleCollision(A,B) ➤ ${emojiFor(B.touched)}`, 10, screen.height * 2 / 3 + 90);
}
