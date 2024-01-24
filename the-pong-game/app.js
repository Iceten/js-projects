const canvasEl = document.querySelector("canvas");
const canvasContext = canvasEl.getContext("2d");

canvasEl.width = 1500;
canvasEl.height = 720;
// --------------------------------------------------------------------

let RIScore = new Audio();
let AIScore = new Audio();
let hit = new Audio();
let wall = new Audio();

hit.src = "sounds/hit.mp3";
wall.src = "sounds/wall.mp3";
AIScore.src = "sounds/AIScore.mp3";
RIScore.src = "sounds/RIScore.mp3";

//The RI Player paddle
const playerPaddleRI = {
  xP: 0,
  yP: canvasEl.height / 2 - 100 / 2,
  height: 100,
  width: 10,
  color: "yellow",
  score: 0,
};

//The AI Player paddle
const playerPaddleAI = {
  xP: canvasEl.width - 10,
  yP: canvasEl.height / 2 - 100 / 2,
  height: 100,
  width: 10,
  color: "red",
  score: 0,
};

//The Creating the Ball
const ball = {
  xP: canvasEl.width / 2,
  yP: canvasEl.height / 2,
  //   yP: canvasEl.height / 2,
  radius: 10,
  speed: 7,
  xV: 5,
  yV: 0,
  color: "white",
};

//The Creating the Net
const net = {
  xP: canvasEl.width / 2 - 1,
  yP: 0,
  width: 2,
  height: 10,
  color: "white",
};

//Drawing the canvas
function drawRect(xP, yP, width, height, color) {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(xP, yP, width, height);
  canvasContext.beginPath();
  //   canvasContext.arc(xP, yP);
}

function drawCircle(xP, yP, radius, color) {
  canvasContext.fillStyle = color;
  canvasContext.beginPath();
  canvasContext.arc(xP, yP, radius, 0, Math.PI * 2);
  canvasContext.fill();
}

function drawText(content, xP, yP, color) {
  canvasContext.fillStyle = color;
  canvasContext.font = "35px sans-serif";
  canvasContext.fillText(content, xP, yP);
}

function drawNet() {
  for (let i = 0; i < canvasEl.height; i++) {
    drawRect(net.xP, net.yP + i, net.width, net.height, net.color);
  }
}

//runGame function - Game Loop
function runGame() {
  //Clearing the canvas
  drawRect(0, 0, canvasEl.width, canvasEl.height, "#4683a0");

  //draw Net function
  drawNet();

  //Draw Score function
  drawText(
    playerPaddleRI.score,
    (1 * canvasEl.width) / 4,
    (1 * canvasEl.height) / 10,
    "white"
  );
  drawText(
    playerPaddleRI.score,
    (3 * canvasEl.width) / 4,
    (1 * canvasEl.height) / 10,
    "white"
  );

  //Drawing the Paddle for RI and AI
  drawRect(
    playerPaddleRI.xP,
    playerPaddleRI.yP,
    playerPaddleRI.width,
    playerPaddleRI.height,
    playerPaddleRI.color
  );

  drawRect(
    playerPaddleAI.xP,
    playerPaddleAI.yP,
    playerPaddleAI.width,
    playerPaddleAI.height,
    playerPaddleAI.color
  );

  //Drawing the ball
  drawCircle(ball.xP, ball.yP, ball.radius, ball.color);
}

//The player Paddle RI Eventlistener
canvasEl.addEventListener("mousemove", movePaddle);

function movePaddle(e) {
  let canvasRect = canvasEl.getBoundingClientRect();
  playerPaddleRI.yP = e.clientY - canvasRect.top - playerPaddleRI.height / 2;
}

// The Game Initialization function
const FPS = 60;
function gameInit() {
  everythingManager();
  runGame();
}

setInterval(gameInit, 1000 / FPS);

//The Collision Detection of Paddles Function
function paddleColliDete(ballArg, paddleArg) {
  ballArg.top = ballArg.yP - ballArg.radius;
  ballArg.bottom = ballArg.yP + ballArg.radius;
  ballArg.left = ballArg.xP - ballArg.radius;
  ballArg.right = ballArg.xP + ballArg.radius;

  paddleArg.top = paddleArg.yP;
  paddleArg.bottom = paddleArg.yP + paddleArg.height;
  paddleArg.left = paddleArg.xP;
  paddleArg.right = paddleArg.xP + paddleArg.width;

  //   console.log("ball", ballArg);
  //   console.log("paddle", paddleArg);
  //   console.log("ballArg.right > paddleArg.left", ballArg.right > paddleArg.left);
  //   console.log("ballArg.bottom > paddleArg.top", ballArg.bottom > paddleArg.top);
  //   console.log("ballArg.left < paddleArg.right", ballArg.left < paddleArg.right);
  //   console.log("ballArg.top < paddleArg.bottom", ballArg.top < paddleArg.bottom);

  return (
    ballArg.right > paddleArg.left &&
    ballArg.bottom > paddleArg.top &&
    ballArg.left < paddleArg.right &&
    ballArg.top < paddleArg.bottom
  );
}

//The resetBall function
function resetBall() {
  ball.xP = canvasEl.width / 2;
  ball.yP = canvasEl.height / 2;
  ball.speed = 7;
  ball.xV = 5;
  ball.yV = 0;
}
//The Everything Manager Function
function everythingManager() {
  //Moving the ball by the amount of speed
  ball.xP += ball.xV;
  ball.yP += ball.yV;

  //Creating the AI
  let intelligenceLevel = 0.1;

  playerPaddleAI.yP +=
    (ball.yP - (playerPaddleAI.yP + playerPaddleAI.height / 2)) *
    intelligenceLevel;

  //Bouncing of the top and bottom walls
  if (ball.yP + ball.radius > canvasEl.height || ball.yP - ball.radius < 0) {
    ball.yV = -ball.yV;
    wall.play();
  }

  let player = ball.xP > canvasEl.width / 2 ? playerPaddleAI : playerPaddleRI;

  if (paddleColliDete(ball, player)) {
    hit.play();
    let collisionPoint = ball.yP - (player.yP + player.height / 2);

    //normalization -> converting -50 & 50 -> -1 & 1
    collisionPoint = collisionPoint / (player.height / 2);

    //Calculating the angle at which it bounces back (radians)
    let bounceAngle = (collisionPoint * Math.PI) / 4;

    //Calculating the directionof the ball when it bounces back
    let direction = ball.xP < canvasEl.width / 2 ? 1 : -1;
    //updating the velocity when the ball hit any paddle
    ball.xV = direction * ball.speed * Math.cos(bounceAngle);
    ball.yV = direction * ball.speed * Math.sin(bounceAngle);

    //After each bounce back, the speed of the ball should be increased

    ball.speed += 0.5;

    // console.log("Ball new Speed-->  xV: ", ball.xV, " yV: ", ball.yV);
  }

  if (ball.xP + ball.radius < 0) {
    //The AI Scored
    playerPaddleAI.score++;
    AIScore.play();
    resetBall();
  } else if (ball.xP - ball.radius > canvasEl.width) {
    // The RI Scored
    playerPaddleRI.score++;
    RIScore.play();
    resetBall();
  }
}
