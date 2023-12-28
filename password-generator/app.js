const passwordShow = document.querySelector("#password-display");
const inputCharRange = document.querySelector("#range-char");
const inputCharNum = document.querySelector("#number-char");

const numbers = document.querySelector("#numbers");
const symbols = document.querySelector("#symbols");
const uppercase = document.querySelector("#uppercase");
const submit = document.querySelector("input[type=submit]");

const lowerCaseCharCodes = arrayLowtoHigh(97, 122);
const higherCaseCharCodes = arrayLowtoHigh(65, 90);
const numberCharCodes = arrayLowtoHigh(48, 57);
const symbolCharCodes = arrayLowtoHigh(33, 47)
  .concat(arrayLowtoHigh(58, 64))
  .concat(arrayLowtoHigh(91, 96))
  .concat(arrayLowtoHigh(123, 126));

inputCharRange.addEventListener("input", () => {
  inputCharNum.value = inputCharRange.value;
});
inputCharNum.addEventListener("input", () => {
  inputCharRange.value = inputCharNum.value;
});

submit.addEventListener("click", (e) => {
  e.preventDefault();
  const password = generatePassword(
    inputCharNum.value,
    numbers.checked,
    symbols.checked,
    uppercase.checked
  );
  passwordShow.innerText = password;
});

function generatePassword(
  characterNumber,
  hasNumbers,
  hasSymbols,
  isUppercase
) {
  let charCodes;

  if (isUppercase) {
    charCodes = higherCaseCharCodes;
  } else {
    charCodes = lowerCaseCharCodes;
  }

  if (hasNumbers) charCodes = charCodes.concat(numberCharCodes);

  if (hasSymbols) charCodes = charCodes.concat(symbolCharCodes);

  let characterCodes = [];
  const password = [];

  for (let i = 0; i < characterNumber; i++) {
    characterCodes.push(
      charCodes[Math.floor(Math.random() * charCodes.length)]
    );
    password.push(String.fromCharCode(characterCodes[i]));
  }
  return password.join("");
}

function arrayLowtoHigh(low, high) {
  let array = [];
  for (let i = low; i <= high; i++) {
    array.push(i);
  }
  return array;
}
