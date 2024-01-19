// https://icanhazdadjoke.com/api

const jokePara = document.querySelector(".joke");
const jokeBtn = document.querySelector(".joke-container button");
const apiEndpoint = "https://icanhazdadjoke.com/";

//Events
//Load a new Joke
jokeBtn.addEventListener("click", getJoke);

async function getJoke() {
  const response = await fetch(apiEndpoint, {
    headers: {
      Accept: "application/json",
    },
  });
  // .then((response) => response.json())
  // .then((responseData) => console.log(responseData));
  const responseData = await response.json();

  jokePara.innerText = responseData.joke;
}
