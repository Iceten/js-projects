const canvasEl = document.querySelector("canvas");

const canvasContext = canvasEl.getContext("2d");

canvasEl.height = 600;
canvasEl.width = 800;

const step = 10;

let ball = {
  xCoord: 400,
  yCoord: 300,
  radius: 40,
  startAngle: 0,
  endAngle: Math.PI * 2,
};

canvasContext.fillStyle = "white";
canvasContext.beginPath();
canvasContext.arc(
  ball.xCoord,
  ball.yCoord,
  ball.radius,
  ball.startAngle,
  ball.endAngle
);
canvasContext.fill();

function moveRight(ball, step) {
  console.log("move Right called");
  console.log(ball.xCoord + ball.radius + step);
  if (ball.xCoord + ball.radius + step < canvasEl.width) {
    ball.xCoord += step;
    console.log("step Right taken");
  }
  canvasContext.beginPath();
  canvasContext.arc(
    ball.xCoord,
    ball.yCoord,
    ball.radius,
    ball.startAngle,
    ball.endAngle
  );
  canvasContext.fill();
}

function moveLeft(ball, step) {
  if (ball.xCoord - ball.radius - step > 0) {
    ball.xCoord -= step;
  }
  canvasContext.beginPath();
  canvasContext.arc(
    ball.xCoord,
    ball.yCoord,
    ball.radius,
    ball.startAngle,
    ball.endAngle
  );
  canvasContext.fill();
}
function moveUp(ball, step) {
  console.log("move Up Called");
  console.log(ball.yCoord - ball.radius - step < 0);
  if (ball.yCoord - ball.radius - step > 0) {
    ball.yCoord -= step;
  }
  canvasContext.beginPath();
  canvasContext.arc(
    ball.xCoord,
    ball.yCoord,
    ball.radius,
    ball.startAngle,
    ball.endAngle
  );
  canvasContext.fill();
}
function moveDown(ball, step) {
  if (ball.yCoord + ball.radius + step < canvasEl.height) {
    ball.yCoord += step;
  }
  canvasContext.beginPath();
  canvasContext.arc(
    ball.xCoord,
    ball.yCoord,
    ball.radius,
    ball.startAngle,
    ball.endAngle
  );
  canvasContext.fill();
}
//Events
//Moving the Ball
window.addEventListener("keyup", (e) => moveBall(e));

function moveBall(e) {
  canvasContext.clearRect(0, 0, canvasEl.width, canvasEl.height);
  if (e.key === "ArrowRight") {
    console.log(e.key);
    moveRight(ball, step);
  } else if (e.key === "ArrowLeft") {
    console.log(e.key);
    moveLeft(ball, step);
  } else if (e.key === "ArrowUp") {
    moveUp(ball, step);
  } else if (e.key === "ArrowDown") {
    moveDown(ball, step);
  }
}

// let timeDiff = 1000,
//   timeLast = 0;

// requestAnimationFrame(runGame);
// function runGame(timeNow) {
//   canvasContext.clearRect(0, 0, canvasEl.width, canvasEl.height);
//   timeDiff = timeNow - timeLast;
//   timeLast = timeNow;

//   requestAnimationFrame(runGame);
// }

function checkMoveRight(ball, step) {
  if (ball.xCoord + ball.radius + step < canvasEl.width) {
    ball.xCoord += step;
  }
}
