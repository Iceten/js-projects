const keys = document.querySelectorAll(".keys input");
const display = document.querySelector(".display textarea");

let typedText = "";

keys.forEach((key) => {
  key.addEventListener("click", () => {
    letter = key.getAttribute("value");
    typedText += letter;
    display.innerHTML = typedText;
  });
});
