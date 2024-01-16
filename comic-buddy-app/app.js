const superHeroName = document.querySelector("#name");
const superHeroUniverse = document.querySelector("#universe");
const superHeroPower = document.querySelector("#power");
const submit = document.querySelector(".add-superhero");
const listData = document.querySelector(".superhero-list-data");

function onClearList() {
  localStorage.removeItem("superheros");
}

class SuperheroEntry {
  constructor(name, universe, power) {
    this.name = name;
    this.universe = universe;
    this.superpower = power;
  }
}

class SuperheroList {
  addSuperhero(newSuper) {
    console.log(newSuper);
    const listData = document.querySelector(".superhero-list-data");
    const listContainer = document.createElement("ul");
    listContainer.setAttribute("id", "list");

    listContainer.innerHTML += `
    <li>${newSuper.name}</li>
    <li>${newSuper.universe}</li>
    <li>${newSuper.superpower}</li>
    <i class="fas fa-trash"></i>
    `;

    listData.appendChild(listContainer);
  }

  clearSuperheroInputs() {
    [
      document.querySelector("#name").value,
      document.querySelector("#universe").value,
      document.querySelector("#power").value,
    ] = ["", "", ""];
  }

  validationError() {
    document.querySelector(".validate-error").classList.add("show-validation");

    setTimeout(() => {
      document
        .querySelector(".validate-error")
        .classList.remove("show-validation");
    }, 1500);
  }

  validationSuccess() {
    document
      .querySelector(".validate-success")
      .classList.add("show-validation");

    setTimeout(() => {
      document
        .querySelector(".validate-success")
        .classList.remove("show-validation");
    }, 1500);
  }
}

class StoreSuperhero {
  static getSuperheros() {
    let superheros;
    if (localStorage.getItem("superheros") === null) {
      superheros = [];
    } else {
      superheros = JSON.parse(localStorage.getItem("superheros"));
    }

    return superheros;
  }

  static addSuperhero(entry) {
    const superheroList = StoreSuperhero.getSuperheros();
    superheroList.push(entry);
    localStorage.setItem("superheros", JSON.stringify(superheroList));
  }

  static displaySuperhero() {
    const superheroList = StoreSuperhero.getSuperheros();

    superheroList.forEach((superhero) => {
      //Instanciating the SuperheroList Class
      const list = new SuperheroList();
      list.addSuperhero(superhero);
    });
  }

  static removeSuperhero(clickedName) {
    console.log(clickedName);
    const superheroList = StoreSuperhero.getSuperheros();

    superheroList.forEach((superhero, index) => {
      if (superhero.name === clickedName) {
        superheroList.splice(index, 1);
      }
    });

    localStorage.setItem("superheros", JSON.stringify(superheroList));
  }
}

//Events
//Page initialization
document.addEventListener("DOMContentLoaded", () => {
  StoreSuperhero.displaySuperhero();
});

//Adding New Super hero
submit.addEventListener("click", (e) => {
  e.preventDefault();
  let superName = superHeroName.value;
  let superUniverse = superHeroUniverse.value;
  let superPower = superHeroPower.value;

  const entry = new SuperheroEntry(superName, superUniverse, superPower);
  const list = new SuperheroList();

  if (superName === "" || superUniverse === "" || superPower === "") {
    list.validationError();
  } else {
    list.addSuperhero(entry);
    list.clearSuperheroInputs();
    list.validationSuccess();

    StoreSuperhero.addSuperhero(entry);
  }
});

// Deleting Listed SuperHeroes
listData.addEventListener("click", (e) => {
  if (e.target.className === "fas fa-trash") {
    const trash = e.target.parentNode;

    const clickedSuperhero =
      e.target.previousElementSibling.previousElementSibling
        .previousElementSibling.textContent;

    StoreSuperhero.removeSuperhero(clickedSuperhero);

    trash.remove();
  }
});
