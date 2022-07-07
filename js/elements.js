/******      Les cercles      ******/
let A = { // Cercle déplçable
  x: 50,
  y: 50,
  r: 40,
  name: "A",
  color: "DeepSkyBlue"
};
let B = { // Cercle fixe
  x: 0,
  y: 0,
  r: 60,
  name: "B",
  color: "LightGreen",
  touched: false
};
let C = { // Point de contact
  x: 0,
  y: 0,
  r: 0,
  name: "C",
  color: "White"
};

/******      Les Cercles bis (représentation horizontale des écarts)      ******/
let Abis = {
  x: 0,
  y: 0,
  r: 40,
  color: "DeepSkyBlue"
};
let Bbis = {
  x: 0,
  y: 0,
  r: 60,
  color: "LightGreen",
};
let Cbis = { // Point de contact
  x: 0,
  y: 0,
  r: 0,
  color: "White"
};

let distanceAB = 0;

/******      Divers      ******/
const screen = {
  width: 0,
  heigth: 0
};

// Pixels / moves
const move = 6;
