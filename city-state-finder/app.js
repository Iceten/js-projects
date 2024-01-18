const searchInput = document.querySelector(".search");
const resultsCtn = document.querySelector(".suggestions");

const citiesStates = [];
const apiEndpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

fetch(apiEndpoint)
  .then((response) => response.json())
  .then((responseData) => {
    citiesStates.push(...responseData);
    // console.log(responseData);
  })
  .then(() => {
    console.log("citiesState: \n", citiesStates);
  });

//Events
//Typing city
searchInput.addEventListener("keyup", displayResults);
searchInput.addEventListener("change", displayResults);

function displayResults() {
  const filteredData = findMatches(this.value, citiesStates);

  matchedEl = filteredData
    .map((dataSet) => {
      const regX = new RegExp(this.value, "gi");
      const cityName = dataSet.city.replace(
        regX,
        `<span class="highlight"> ${this.value}</span>`
      );
      const cityState = dataSet.state.replace(
        regX,
        `<span class="highlight"> ${this.value}</span>`
      );

      return `<li>${cityName}, ${cityState}<li>`;
    })
    .join("");

  resultsCtn.innerHTML = matchedEl;
  console.log(matchedEl);
}

function findMatches(wordToMatch, dataSets) {
  return dataSets.filter((dataSet) => {
    const regX = new RegExp(wordToMatch, "gi");
    return dataSet.city.match(regX) || dataSet.state.match(regX);
  });
}

setTimeout(() => {
  findMatches("hoho", citiesStates);
}, 1000);
