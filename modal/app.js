const modalContainer = document.querySelector(".modal-container");
const btnOpen = document.querySelector(".open");
const btnClose = document.querySelector(".modal-btn");

btnOpen.addEventListener("click", () => {
  setTimeout(() => {
    modalContainer.classList.add("show");
  }, 50);
});

btnClose.addEventListener("click", () => {
  modalContainer.classList.remove("show");
});
