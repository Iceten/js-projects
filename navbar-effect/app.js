const sections = document.querySelectorAll("section");
const navlist = document.querySelectorAll("ul li a");
const trans = document.querySelector(".trans");
let options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.55,
};

const navMap = new Map();
navMap.set("home", "0");
navMap.set("about", "1");
navMap.set("services", "2");
navMap.set("contact", "3");

const colors = {
  home: "coral",
  about: "chartreuse",
  services: "chocolat",
  contact: "cadetblue",
};

let handleIntersect = function (entries) {
  entries.forEach((entry) => {
    let sectName = entry.target.className;
    const activeLink = navlist[navMap.get(sectName)];
    const directions = activeLink.getBoundingClientRect();
    const coordinates = {
      height: directions.height,
      width: directions.width,
      top: directions.top,
      left: directions.left,
    };

    if (entry.isIntersecting) {
      console.log("Section ", sectName, " is intersecting");
      console.log(trans);
      console.log(colors[sectName]);
      console.log(`${coordinates.height}px`);

      //   activeLink.style.backgroundColor = "red";
      trans.style.setProperty("height", `${coordinates.height}px`);
      trans.style.setProperty("width", `${coordinates.width}px`);
      trans.style.setProperty("top", `${coordinates.top}px`);
      trans.style.setProperty("left", `${coordinates.left}px`);
      trans.style.backgroundColor = colors[sectName];
    }
  });
};

let observer = new IntersectionObserver(handleIntersect, options);

sections.forEach((section) => {
  observer.observe(section);
});

console.log(trans);
