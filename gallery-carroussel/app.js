const images = document.querySelectorAll(".img-container .item");
const btnLeft = document.querySelector(".btn.btn-left");
const btnRight = document.querySelector(".btn.btn-right");

console.log(btnLeft);
console.log(btnRight);
console.log(images.length);

function setCarroussel() {
  iterator = 0;
  images.forEach((image) => {
    image.style.left = `${iterator * 100}%`;
    //   console.log(iterator);
    //   console.log(image.style.left);
    iterator += 1;
  });
  return "Images Aligned Horizontally";
}
setCarroussel();

function setButtons() {
  position = parseInt(images[0].style.left);
  if (position == 0) {
    btnLeft.classList.add("hidden");
  } else {
    btnLeft.classList.remove("hidden");
  }

  if (position == -900) {
    btnRight.classList.add("hidden");
  } else {
    btnRight.classList.remove("hidden");
  }
}

setButtons();

function moveLeft() {
  position = parseInt(images[0].style.left) - 100;
  images.forEach((image) => {
    image.style.left = `${position}%`;
    position += 100;
    console.log(image.style.left);
  });
  setButtons();
}

function moveRight() {
  position = parseInt(images[0].style.left) + 100;
  images.forEach((image) => {
    image.style.left = `${position}%`;
    position += 100;
    console.log(image.style.left);
  });
  setButtons();
}

btnLeft.addEventListener("click", moveRight);
btnRight.addEventListener("click", moveLeft);
