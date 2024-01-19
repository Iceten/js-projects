// http://numbersapi.com/

const factPara = document.querySelector(".fact");
const factInput = document.querySelector(".fact-container input");
const factBtn = document.querySelector(".fact-container button");
const factURl = "http://numbersapi.com/";
const proxyURL = "https://cors-anywhere.herokuapp.com/";

//Events
//Load a fact
factBtn.addEventListener("click", getFact);

async function getFact() {
  const httpQuery = factURl + factInput.value;
  //   const response = await fetch(`${proxyURL}${httpQuery}`, {
  //     method: "GET",
  //     headers: {
  //       "x-requested-with": "text/plain",
  //     },
  //   });

  const response = await fetch(httpQuery);
  const responseData = await response.text();

  factPara.innerText = responseData;
}
