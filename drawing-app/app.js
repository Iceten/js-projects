const canvas = document.querySelector("#drawing-canvas");
const btnDecrease = document.querySelector("#decrease");
const btnIncrease = document.querySelector("#increase");
const strokeThickness = document.querySelector("#size");
const btnClear = document.querySelector("#clear");
const inputColor = document.querySelector("#color");

const ctx = canvas.getContext("2d");
let size = 10;
let isPressed = false;
let color = inputColor.value;
let x = undefined;
let y = undefined;

inputColor.addEventListener("change", (e) => {
  color = e.target.value;
  ctx.strokeStyle = color;
});

canvas.addEventListener("mousedown", (e) => {
  isPressed = true;
  x = e.offsetX;
  y = e.offsetY;
});

canvas.addEventListener("mouseup", (e) => {
  isPressed = false;
  x = undefined;
  y = undefined;
});

canvas.addEventListener("mousemove", (e) => {
  if (isPressed) {
    const x2 = e.offsetX;
    const y2 = e.offsetY;

    drawCircle(x2, y2);
    drawLine(x, y, x2, y2);

    x = x2;
    y = y2;
  }
});

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = size * 2;
  ctx.stroke();
}

function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

btnIncrease.addEventListener("click", () => {
  size += 1;
  if (size > 50) {
    size = 50;
  }
  updateSize();
});
btnDecrease.addEventListener("click", () => {
  size -= 1;
  if (size < 1) {
    size = 1;
  }
  updateSize();
});

// Updating the Stroke Dynamically
updateSize = () => {
  strokeThickness.innerText = size;
};

btnClear.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
