const block = document.querySelector("#block");
const ctrlY = document.querySelector("input[type=range]#position-y");
const ctrlX = document.querySelector("input[type=range]#position-x");
const ctrlCols = document.querySelectorAll(".container.rgba-container input");
const ctrlColR = document.querySelector("input[type=range]#rgba-r");
const ctrlColG = document.querySelector("input[type=range]#rgba-g");
const ctrlColB = document.querySelector("input[type=range]#rgba-b");
const ctrlColA = document.querySelector("input[type=range]#rgba-a");
const ctrlSize = document.querySelector("input[type=range]#size");
const ctrlShape = document.querySelector("select#shape-select");

const btnShape = document.querySelector("button#ok-btn");

ctrlCols.forEach((col) => {
  col.addEventListener("change", (e) => {
    setColor();
  });
});

ctrlY.addEventListener("change", (e) => {
  block.style.top = `${ctrlY.value}px`;
});
ctrlX.addEventListener("change", (e) => {
  block.style.left = `${ctrlX.value}px`;
});

ctrlSize.addEventListener("change", (e) => {
  block.style.width = `${150 * ctrlSize.value}px`;
  block.style.height = `${150 * ctrlSize.value}px`;
});

btnShape.addEventListener("click", () => {
  let shapeVal = ctrlShape.value;
  shapeVal === "2"
    ? block.style.setProperty("border-radius", "50%")
    : block.style.setProperty("border-radius", "0%");

  console.log(shapeVal);
});

const setColor = () => {
  rgba = `rgba(${ctrlColR.value},${ctrlColG.value},${ctrlColB.value},${ctrlColA.value})`;
  block.style.setProperty("background-color", rgba);
};
