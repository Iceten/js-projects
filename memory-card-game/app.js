const memoryCards = document.querySelectorAll(".memory-card");
const testCard = document.querySelectorAll(
  ".memory-card[data-name=baby-beaar]"
);
let lastClicked = "";

memoryCards.forEach((memoryCard) => {
  memoryCard.addEventListener("click", (e) => {
    memoryCard.classList.add("flip");
    const item = memoryCard.dataset.name;

    if (lastClicked === item) {
      console.log("It's pairing with " + lastClicked);
      lastClicked = "";
    } else if (lastClicked !== item && lastClicked !== "") {
      console.log("It's not pairing former " + item + " with " + lastClicked);

      const formerCards = document.querySelectorAll(
        `.memory-card[data-name=${lastClicked}]`
      );
      setTimeout(() => {
        formerCards.forEach((card) => {
          card.classList.remove("flip");
        });
        memoryCard.classList.remove("flip");
      }, 1000);

      lastClicked = "";
    } else if (lastClicked === "") {
      console.log("First Selection : " + lastClicked);
      lastClicked = item;
    }
  });
});

const checkPair = (item) => {};
