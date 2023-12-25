const keys = document.querySelectorAll(".key");
const notes = document.querySelectorAll("audio");

keys.forEach((key) => {
  key.addEventListener("mousedown", (e) => {
    key.classList.add("active");
    // const notePressed = e.target.getAttribute("data-note");
    playNote(key);
  });

  key.addEventListener("mouseup", (e) => {
    key.classList.remove("active");
  });
});

function playNote(keyPressed) {
  const noteToPlay = document.querySelector(`#${keyPressed.dataset.note}`);
  noteToPlay.play();
}
