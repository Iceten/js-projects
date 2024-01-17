/*
Public API Repo
https://github.com/public-apis/public-apis
*/
const btnCat = document.querySelector(".get-cat");
const btnFox = document.querySelector(".get-fox");
const btnDog = document.querySelector(".get-dog");
const btnDuck = document.querySelector(".get-duck");

const ctnCat = document.querySelector(".cat");
const ctnFox = document.querySelector(".fox");
const ctnDog = document.querySelector(".dog");
const ctnDuck = document.querySelector(".duck");

//Events
//Load a new Cat
btnCat.addEventListener("click", getRandomCat);
//Load a new Fox
btnFox.addEventListener("click", getRandomFox);
//Load a new Dog
btnDog.addEventListener("click", getRandomDog);
//Load a new Dog
btnDuck.addEventListener("click", getRandomDuck);

function getRandomCat() {
  console.log("getRandomCat called");
  const httpUrl = "https://cataas.com/cat";

  fetch(httpUrl).then((response) => console.log(response));
  // .then((responseData) => console.log(responseData));
}

function getRandomFox() {
  console.log("getRandomFox called");
  const httpUrl = "https://randomfox.ca/floof/ ";
  fetch(httpUrl)
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      ctnFox.innerHTML = `
    <img src="${responseData.image}"
    </img>`;
      console.log(responseData);
    });
}

function getRandomDog() {
  console.log("getRandomDog called");
  const httpUrl = "https://random.dog/";
  fetch(httpUrl).then((response) => console.log(response));
  // .then((responseData) => console.log(responseData));
}

function getRandomDuck() {
  console.log("getRandomDuck called");
  const httpUrl = "https://random-d.uk/api";
  fetch(httpUrl).then((response) => console.log(response));
  // .then((responseData) => console.log(responseData));
}
