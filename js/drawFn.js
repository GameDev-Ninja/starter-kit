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
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "White";
  ctx.setLineDash([0, 0]);
  ctx.moveTo(0, screen.height * 2 / 3);
  ctx.lineTo(screen.width, screen.height * 2 / 3);
  ctx.stroke();
}

/**
 * Dessine les lignes de repère et les ligne de distance et rayons
 * @param {*} ctx 
 */
function drawLines(ctx) {
  const dash = [10, 4];

  // A Ray
  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.strokeStyle = "Navy";
  ctx.setLineDash([0, 0]);
  ctx.moveTo(Abis.x, Abis.y);
  ctx.lineTo(Abis.x + Abis.r, Abis.y);
  ctx.stroke();

  // B Ray
  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.strokeStyle = "DarkOliveGreen";
  ctx.setLineDash([0, 0]);
  ctx.moveTo(Bbis.x, Abis.y);
  ctx.lineTo(Bbis.x - Bbis.r, Bbis.y);
  ctx.stroke();

  // A Dashed
  drawCircle(ctx, { x: Abis.x, y: Abis.y, r: 3, color: "white" });
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "White";
  ctx.setLineDash(dash);
  ctx.moveTo(Abis.x, Abis.y);
  ctx.lineTo(Abis.x, screen.height * 2 / 3 + 25);
  ctx.stroke();

  // B Dashed
  drawCircle(ctx, { x: Bbis.x, y: Bbis.y, r: 3, color: "white" });
  ctx.beginPath();
  ctx.lineWidth = 2;
  // ctx.strokeStyle = "White";
  ctx.setLineDash(dash);
  ctx.moveTo(Bbis.x, Bbis.y);
  ctx.lineTo(Bbis.x, screen.height * 2 / 3 + 25);
  ctx.stroke();

  // Distance
  ctx.beginPath();
  ctx.lineWidth = 2;
  // ctx.strokeStyle = "White";
  ctx.setLineDash([0, 0]);
  ctx.moveTo(Abis.x, screen.height * 2 / 3 + 25);
  ctx.lineTo(Bbis.x, screen.height * 2 / 3 + 25);
  ctx.stroke();

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