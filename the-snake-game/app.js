const canvasEl = document.querySelector("canvas");
const conX = canvasEl.getContext("2d");

canvasEl.width = 400;
canvasEl.height = 400;

let speed = 7;
let tileCount = 20;
let snakeHeadX = 5;
let snakeHeadY = 5;
let xV = 1;
let yV = 0;
let snackX = 5;
let snackY = 5;
let snakeTailLength = 2;
let score = 0;

// Derived Dimension
let tileSize = canvasEl.width / tileCount;

//Snake Body Array
const snakeBody = [];

let snakeBite = new Audio();
snakeBite.src = "eat.wav";

// Class SnakeBody
class SnakeBody {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

//Events
//Arrow key event listener
document.addEventListener("keydown", keyDown);

function keyDown(e) {
  //Moving up
  if (e.keyCode === 38) {
    if (yV === 1) return;
    yV = -1;
    xV = 0;
  }

  //Moving down
  if (e.keyCode === 40) {
    if (yV === -1) return;
    yV = 1;
    xV = 0;
  }

  //Moving left
  if (e.keyCode === 37) {
    if (xV === 1) return;
    yV = 0;
    xV = -1;
  }

  //Moving right
  if (e.keyCode === 39) {
    if (xV === -1) return;
    yV = 0;
    xV = 1;
  }
}

// Run Game Function
function runGame() {
  changeSnakePosition();

  //handling gameOver
  let result = gameOver();
  if (result) return;

  clearScreen();
  snackColiDete();
  drawSnack();
  drawSnake();
  drawScore();

  setTimeout(runGame, 1000 / speed);
}

runGame();

//function Game Over
function gameOver() {
  let gameOver = false;
  if (xV === 0 && yV === 0) return false;

  //Checking for wall colision
  //   if (snakeHeadX < 0) {
  //     gameOver = true;
  //   } else if (snakeHeadX === tileCount) {
  //     gameOver = true;
  //   } else if (snakeHeadY < 0) {
  //     gameOver = true;
  //   } else if (snakeHeadY === tileCount) {
  //     gameOver = true;
  //   }

  if (
    snakeHeadX < 0 ||
    snakeHeadX === tileCount ||
    snakeHeadY < 0 ||
    snakeHeadY === tileCount
  ) {
    gameOver = true;
  }
  //checking the Snake Body Colision
  for (let i = 0; i < snakeBody.length; i++) {
    let part = snakeBody[i];
    if (part.x === snakeHeadX && part.y === snakeHeadY) {
      gameOver = true;
      break;
    }
  }

  if (gameOver) {
    conX.fillStyle = "white";
    conX.font = "50px sans-serif";
    conX.fillText("GAME OVER", canvasEl.width / 8, canvasEl.height / 2);
  }
  return gameOver;
}

// ClearScreen function
function clearScreen() {
  conX.fillStyle = "black";
  conX.fillRect(0, 0, canvasEl.width, canvasEl.height);
}

// Draw Snake function
function drawSnake() {
  conX.fillStyle = "orange";
  for (let i = 0; i < snakeBody.length; i++) {
    let part = snakeBody[i];

    conX.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    // console.log(
    //   "Supposedly drawn body part:",
    //   i,
    //   "part.x: ",
    //   part.x,
    //   "part.y: ",
    //   part.y
    // );
  }
  //   console.log(snakeBody);
  snakeBody.push(new SnakeBody(snakeHeadX, snakeHeadY));

  if (snakeBody.length > snakeTailLength) {
    snakeBody.shift();
  }

  conX.fillStyle = "green";
  conX.fillRect(
    snakeHeadX * tileCount,
    snakeHeadY * tileCount,
    tileSize,
    tileSize
  );
}

// Draw Snack
function drawSnack() {
  conX.fillStyle = "red";
  conX.fillRect(snackX * tileCount, snackY * tileCount, tileSize, tileSize);
  conX.fill();
}

// function Snack Colision detection
function snackColiDete() {
  if (snackX === snakeHeadX && snackY === snakeHeadY) {
    snackX = Math.floor(Math.random() * tileCount);
    snackY = Math.floor(Math.random() * tileCount);

    snakeTailLength++;
    score++;
    speed++;
    snakeBite.play();
  }
}

//function changeSnakePosition
function changeSnakePosition() {
  snakeHeadX += xV;
  snakeHeadY += yV;
}

//function Draw Score;
function drawScore() {
  conX.fillStyle = "white";
  conX.font = "15px sans-serif";
  conX.fillText(`Score: ${score}`, 20, 20);
}
