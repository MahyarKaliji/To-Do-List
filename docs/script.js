const myContainer = document.querySelector("#container");
const toDoForm = document.querySelector("#to-do-form");
const toDOInput = document.querySelector("#to-do-input");
const toDoList = document.querySelector("#to-do-list");

const toDo = [
  // default user to do list
  { id: 1, name: "learn JavaScript", isDoing: false },
  { id: 2, name: "learn english", isDoing: true },
  { id: 3, name: "do exercise", isDoing: false },
];

let myList =  getListFromLocalStorage() 

showToDo(myList);

// Add Item
toDoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!toDOInput.value.trim()) {
    alert("Please enter a valid item!");
    return;
  }

  if (myList.some((item) => item.name === toDOInput.value.trim())) {
    alert("The entered item is in the list!");
    return;
  }

  const newToDo = {
    id: Date.now(),
    name: toDOInput.value,
    isDoing: false,
  };

  myList.push(newToDo);
  saveListToLocalStorage(myList);
  showToDo(myList);

  toDoForm.reset();
});

// Delete Item
toDoList.addEventListener("click", (e) => {
  console.log(e.target.nodeName);
  
  if (e.target.nodeName === "IMG" && e.target.dataset.type === "deleteBtn") {
    const itemClickedId = Number(e.target.dataset.id);
    const deleteItem = myList.find((item) => item.id === itemClickedId);

    const deletedItemIndex = myList.indexOf(deleteItem);

    myList.splice(deletedItemIndex, 1);

    saveListToLocalStorage(myList);

    showToDo(myList);
  }
});

toDoList.addEventListener("click", (e) => {
  if (
    e.target.nodeName === "IMG" &&
    e.target.dataset.type === "checkBtn" &&
    e
  ) {
    const itemClickedId = Number(e.target.dataset.id);
    const checkItem = myList.find((item) => item.id === itemClickedId);
    console.log(checkItem.isDoing);
    console.log(checkItem);
    if (checkItem.isDoing) checkItem.isDoing = false;
    else checkItem.isDoing = true;
    saveListToLocalStorage(myList);
    showToDo(myList);
  }
});

// ********** Functions **********

function showToDo(items) {
  toDoList.innerHTML = "";

  const taskContainer = document.createElement("div");
  taskContainer.classList.add(
    "flex",
    "flex-col",
    "p-3",
    "items-center",
    "justify-between",
    "bg-stone-900",
    "rounded-lg",
    "m-2"
  );
  toDoList.append(taskContainer);

  items.forEach((item) => {
    const container = document.createElement("div");
    container.classList.add(
      "flex",
      "w-full",
      "p-3",
      "items-center",
      "justify-center",
      "bg-stone-800",
      "rounded-lg",
      "m-2"
    );
    container.dataset.id = item.id;
    taskContainer.append(container);

    const context = document.createElement("div");
    context.classList.add("w-full");

    const title = document.createElement("h2");
    title.classList.add(
      "text-stone-100",
      "text-lg",
      "capitalize",
      "font-medium"
    );
    context.append(title);

    const icons = document.createElement("div");
    icons.classList.add("flex", "items-center", "justify-center", "gap-2");
    container.append(context, icons);

    const check = document.createElement("img");
    check.src = "../assets/images/Check.svg";
    check.className = "check p-1 cursor-pointer";
    check.dataset.id = item.id;
    check.dataset.type = "checkBtn";
    const trash = document.createElement("img");
    trash.src = "../assets/images/Trash.svg";
    trash.className = "trash p-1 cursor-pointer";
    trash.dataset.id = item.id;
    trash.dataset.type = "deleteBtn";
    icons.append(check, trash);
    title.innerText = item.name;
  });
  checkItem();
}

function deleteItem(indexItem) {
  toDo.splice(indexItem, 1);
  saveListToLocalStorage(toDo);
  showToDo(toDo);
}

function checkItem(item) {
  myList.forEach((item) => {
    if (item.isDoing) {
      const didItem = document.querySelector(`div[data-id="${item.id}"]`);

      didItem.classList.add(
        "line-through",
        "decoration-4",
        "text-gray-400",
        "opacity-30"
      );
    }
  });
}

function saveListToLocalStorage(list) {
  localStorage.setItem("To Do List", JSON.stringify(list));
}

function getListFromLocalStorage() {
  try {
    const data = localStorage.getItem("To Do List")
    return data ? JSON.parse(data)  : toDo;
} catch (error) {
    return []
}
}
