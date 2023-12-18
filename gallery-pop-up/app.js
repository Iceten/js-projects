const smallImg = document.querySelectorAll(".gallery img");
const fullImg = document.querySelector(".full-img");
const modal = document.querySelector(".modal");

console.log(smallImg);

smallImg.forEach((img) => {
  img.addEventListener("click", (e) => {
    let altVal = e.target.getAttribute("alt");
    console.log("img/full/" + altVal + ".jpg");
    fullImg.setAttribute("src", "img/full/" + altVal + ".jpg");
    modal.classList.add("open");
    fullImg.classList.add("open");
  });
});

// smallImg.addEventListener("click", (e) => {
//   let altValue = e.target.getAttribute("alt");
//   modal.setAttribute("src", "img/full/${altValue}.jpg");
//   modal.classList.add("open");
// });

modal.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal")) {
    e.target.classList.remove("open");
    fullImg.classList.remove("open");
  }
});
