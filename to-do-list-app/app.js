const inputToDo = document.querySelector("#input");
const submitToDo = document.querySelector(".fa.fa-plus-circle");
const clearTodoList = document.querySelector(".clear");
const listShow = document.querySelector(".content #list");

updateListShow();

clearTodoList.addEventListener("click", onClearList);

inputToDo.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    updateStorageList();
  }
});

submitToDo.addEventListener("click", updateStorageList);

function onClearList() {
  localStorage.removeItem("list");
  console.log("Local Storage cleared");
  updateListShow();
}

function updateStorageList() {
  if (localStorage.getItem("list") !== null) {
    let storageList = JSON.parse(localStorage.getItem("list"));

    let newToDo = {
      name: inputToDo.value,
      id: storageList.length + 1,
      done: false,
      trash: false,
    };

    storageList.push(newToDo);
    localStorage.setItem("list", JSON.stringify(storageList));
  } else {
    let newToDo = {
      name: inputToDo.value,
      id: 1,
      done: false,
      trash: false,
    };

    localStorage.setItem("list", JSON.stringify([newToDo]));
  }
  inputToDo.value = "";
  updateListShow();
}

function updateListShow() {
  listShow.innerHTML = "";
  if (localStorage.getItem("list") !== null) {
    const storageList = JSON.parse(localStorage.getItem("list"));
    storageList.forEach((item) => {
      itemPrint(item);
    });
  }
  updateItemsEvent();
}

function itemPrint(item) {
  console.log(
    "item to print has id : " +
      item.id +
      " trash: " +
      item.trash +
      " done: " +
      item.done
  );

  console.log("Target condition :" + !item.trash && item.done);
  if (!item.trash) {
    if (!item.done) {
      listShow.innerHTML += `<div class="item" data-id=${item.id}>
        <i class="complete fa fa-circle-o" style="color:white"></i>
        <p class="text">${item.name}</p>
        <i class="delete fa fa-trash-o" style="color:white"></i>
    </div>`;
    } else if (item.done) {
      listShow.innerHTML += `<div class="item" data-id=${item.id}>
        <i class="complete fa fa-check-circle" ></i>
        <p class="text line-through">${item.name}</p>
        <i class="delete fa fa-trash-o" style="color:white"></i>
    </div>`;
    }
  }
}

function updateItemsEvent() {
  const btnComplete = document.querySelectorAll(".complete");
  const btnTrash = document.querySelectorAll(".delete");

  btnComplete.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      console.log("Btn complete clicked");
      itemId = e.target.parentNode.dataset.id;
      toggleComplete(itemId);
      updateListShow();
    });
  });
  btnTrash.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      console.log("Btn delete clicked");
      itemId = e.target.parentNode.dataset.id;
      toggleDelete(itemId);
      updateListShow();
    });
  });
}

function toggleComplete(identifier) {
  console.log("Launch toggle Complete");
  let storageList = JSON.parse(localStorage.getItem("list"));

  storageList.forEach((item) => {
    console.log(
      "identifier: " +
        identifier +
        " item id: " +
        item["id"] +
        " item done : " +
        item["done"]
    );

    if (JSON.stringify(item["id"]) === identifier && item["done"] === false) {
      item["done"] = true;
      console.log("Item " + item["id"] + " set to done true");
    } else if (
      JSON.stringify(item["id"]) === identifier &&
      item["done"] === true
    ) {
      item["done"] = false;
      console.log("Item " + item["id"] + " set to done false");
    }
  });

  localStorage.setItem("list", JSON.stringify(storageList));
}

function toggleDelete(identifier) {
  console.log("Launch toggle Delete");
  let storageList = JSON.parse(localStorage.getItem("list"));

  storageList.forEach((item) => {
    console.log(
      "identifier: " +
        identifier +
        " item id: " +
        item["id"] +
        " item trash : " +
        item["trash"]
    );

    if (JSON.stringify(item["id"]) === identifier && item["trash"] === false) {
      item["trash"] = true;
      console.log("Item " + item["id"] + " set to trash true");
    } else if (
      JSON.stringify(item["id"]) === identifier &&
      item["trash"] === true
    ) {
      item["trash"] = false;
      console.log("Item " + item["id"] + " set to trash false");
    }
  });

  localStorage.setItem("list", JSON.stringify(storageList));
}
