const canvasEl = document.querySelector("canvas");
const canvasContext = canvasEl.getContext("2d");

const FPS = 60;
let radius = 50;
let xP, yP;
let xV, yV;

xP = canvasEl.width / 2;
yP = canvasEl.height / 2;
// Velocity Pixel/Frame
xV = Math.floor(Math.random() * 201 + 99) / FPS;
yV = Math.floor(Math.random() * 201 + 99) / FPS;

if (Math.floor(Math.random() * 2) === 0) {
  xV = -xV;
}
if (Math.floor(Math.random() * 2) === 0) {
  yV = -yV;
}

let moveRight = false;
let moveLeft = false;
let moveUp = false;
let moveDown = false;

// The game Loop
function runGame() {
  canvasContext.clearRect(0, 0, canvasEl.width, canvasEl.height);
  xP += xV;
  yP += yV;

  if (yV > 0 && yP >= canvasEl.height - radius) {
    yV = -yV;
  }

  if (xV > 0 && xP >= canvasEl.width - radius) {
    xV = -xV;
  }

  if (yV < 0 && yP <= radius) {
    yV = -yV;
  }

  if (xV < 0 && xP <= radius) {
    xV = -xV;
  }

  canvasContext.beginPath();
  canvasContext.fillStyle = "orange";
  canvasContext.arc(xP, yP, radius, 0, Math.PI * 2);
  canvasContext.fill();
}

setInterval(runGame, 1000 / FPS);
