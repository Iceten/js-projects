const canvasEl = document.querySelector("canvas");
const canvasContext = canvasEl.getContext("2d");

canvasEl.width = window.innerWidth;
canvasEl.height = window.innerHeight;
//Event
//mouse move Event
let mouseEffect = {
  x: undefined,
  y: undefined,
};

window.addEventListener("mousemove", (e) => {
  mouseEffect.x = e.x;
  mouseEffect.y = e.y;
});

let maxRadius = 30;
let minRadius = 10;
//RunBall Class
class RunBall {
  constructor(xP, yP, xV, yV, radius, red, green, blue) {
    this.xP = xP;
    this.yP = yP;
    this.xV = xV;
    this.yV = yV;
    this.radius = radius;
    this.red = red;
    this.green = green;
    this.blue = blue;
  }

  //Drawing the balls
  drawBall = function () {
    canvasContext.fillStyle = `rgb(${this.red},${this.green},${this.blue})`;
    canvasContext.beginPath();
    canvasContext.arc(this.xP, this.yP, this.radius, 0, Math.PI * 2);
    canvasContext.fill();
  };

  //Collision Detection on edges
  updateBall = function () {
    if (this.yV > 0 && this.yP >= canvasEl.height - this.radius) {
      this.yV = -this.yV;
    }

    if (this.xV > 0 && this.xP >= canvasEl.width - this.radius) {
      this.xV = -this.xV;
    }

    if (this.yV < 0 && this.yP <= this.radius) {
      this.yV = -this.yV;
    }

    if (this.xV < 0 && this.xP <= this.radius) {
      this.xV = -this.xV;
    }

    this.xP += this.xV;
    this.yP += this.yV;

    //mouse move Effect

    if (
      mouseEffect.x - this.xP < 20 &&
      mouseEffect.x - this.xP > -20 &&
      mouseEffect.y - this.yP < 20 &&
      mouseEffect.y - this.yP > -20
    ) {
      if (this.radius <= maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > minRadius) {
      this.radius -= 1;
    }
    this.drawBall();
  };
}

let ballArray = [];

for (let i = 0; i < 500; i++) {
  let radius = 10;
  let xP = Math.random() * (canvasEl.width - radius * 2) + radius;
  let yP = Math.random() * (canvasEl.height - radius * 2) + radius;
  let xV = (Math.random() - 0.5) * 2;
  let yV = (Math.random() - 0.5) * 2;
  let red = Math.ceil(Math.random() * 255);
  let green = Math.ceil(Math.random() * 255);
  let blue = Math.ceil(Math.random() * 255);

  ballArray.push(new RunBall(xP, yP, xV, yV, radius, red, green, blue));
}
//Game Loop
function animateBalls() {
  requestAnimationFrame(animateBalls);
  canvasContext.clearRect(0, 0, canvasEl.width, canvasEl.height);

  for (k = 0; k < ballArray.length; k++) {
    ballArray[k].updateBall();
  }
  console.log("running...");
}

animateBalls();
