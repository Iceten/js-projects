const body = document.querySelector("body");
const btnSwitch = document.querySelector(".switch");
const paraColor = document.querySelector(".color");

const min = 0;
const max = 255;

function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function setRGBA() {
  nums = [
    getRandomNum(min, max),
    getRandomNum(min, max),
    getRandomNum(min, max),
  ];

  return `rgba(${nums[0]},${nums[1]},${nums[2]})`;
}

btnSwitch.addEventListener("click", () => {
  newColor = setRGBA();
  body.style.backgroundColor = newColor;
  paraColor.innerHTML = setRGBA();
});
