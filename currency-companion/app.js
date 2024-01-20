const fromCurrInput = document.querySelector(".from-currency");
const toCurrInput = document.querySelector(".to-currency");
const amountInput = document.querySelector(".amount");
const submitBtn = document.querySelector(".get-rate");

const ratesApiKey = "5wQ95CnSvfWMewrHa8Kp1bDGLj74djgS";
const ratesURL = "https://api.apilayer.com/fixer/";
//Events
//Get rate
submitBtn.addEventListener("click", (e) => getRate(e));

async function getRate(event) {
  event.preventDefault();
  //   let httpQuery = `${ratesURL}convert?to={${toCurrInput.value}}&from={${fromCurrInput.value}}&amount={${amountInput.value}}`;
  let httpQuery = `${ratesURL}latest`;

  const response = await fetch(httpQuery, {
    method: "GET",
    redirect: "follow",
    headers: {
      apikey: ratesApiKey,
    },
  });

  console.log(httpQuery);
  console.log(response);
}
