const htmlContainer = document.querySelector("html");
const btnModeToggle = document.querySelector("#toggle");

if (btnModeToggle.checked) {
  htmlContainer.setAttribute("data-theme", "dark");
}

btnModeToggle.addEventListener("click", () => {
  if (htmlContainer.getAttribute("data-theme") == "light") {
    htmlContainer.setAttribute("data-theme", "dark");
  } else {
    htmlContainer.setAttribute("data-theme", "light");
  }
});
