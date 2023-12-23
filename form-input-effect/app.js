const labelFields = document.querySelectorAll(".form-control label");

labelFields.forEach((label) => {
  label.innerHTML = label.innerText
    .split("")
    .map(
      (letter, index) =>
        `<span style='transition-delay: ${index * 50}ms'>${letter}</span>`
    )
    .join("");
});
