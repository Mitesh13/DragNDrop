const items = document.querySelectorAll(".items");
const textbox = document.getElementById("add");
const addBtn = document.getElementById("addBtn");

const storedTasksJson = localStorage.getItem("DragNDropTasks");
if (storedTasksJson) {
  const storedTasks = JSON.parse(storedTasksJson);
  const newTasks = storedTasks.newTasks;
  const goingTasks = storedTasks.goingTasks;
  const doneTasks = storedTasks.doneTasks;
  newTasks.forEach((task) => addNewItem(items[0], task));
  goingTasks.forEach((task) => addNewItem(items[1], task));
  doneTasks.forEach((task) => addNewItem(items[2], task));
}
let item;
let entered;
const deleteElement = (e, item) => {
  if (confirm("Want to delete?")) item.parentElement.removeChild(item);
};
function addNewItem(parent, value) {
  if (!value) return;
  const newItem = document.createElement("div");
  newItem.setAttribute("draggable", true);
  newItem.classList.add("item");
  newItem.textContent = value;
  parent.appendChild(newItem);

  const deleteBtn = document.createElement("img");
  deleteBtn.setAttribute("src", "delete.png");
  deleteBtn.setAttribute("draggable", false);
  deleteBtn.classList.add("delete-icon");
  deleteBtn.textContent = "delete";

  deleteBtn.addEventListener("click", (e) => deleteElement(e, newItem));
  newItem.appendChild(deleteBtn);
}

addBtn.addEventListener("click", () => {
  addNewItem(items[0], textbox.value);
  textbox.value = "";
});

//using event delegation here to minimize multiple listener attachments to each child
for (const i of items) {
  i.addEventListener("dragstart", dragStart);
  i.addEventListener("drop", drop);
  i.addEventListener("dragover", dragOver);
  i.addEventListener("dragenter", dragEnter);
}

//stores dragged item
function dragStart(e) {
  item = e.target;
}

//move down other items when dragged item is dragged over them to show user where the item will be dropped
function dragOver(e) {
  e.preventDefault();

  if (this != e.target && e.target != item) {
    // console.log("e.target", e.target.attributes.draggable == false);
    if (
      !e.target.classList.contains("move-down") &&
      e.target.attributes.draggable == true
    ) {
      console.log("e.target", e.target);
      e.target.className += " move-down";
    }
  }
}

//removes move-down animation
function dragEnter(e) {
  e.preventDefault();
  if (this != e.target) {
    if (
      entered &&
      entered != e.target &&
      e.target.attributes.draggable == true
    ) {
      entered.className = "item";
    }
    entered = e.target;
  }
}

//drops item to specified position
function drop(e) {
  item.className = "item";
  entered.className = "item";
  this.insertBefore(
    item,
    this.children[Array.prototype.indexOf.call(this.children, entered)]
  );

  const newTasks = Array.from(items[0].children).map((item) => {
    console.log("item", item.innerText);
    return item.innerText;
  });
  const goingTasks = Array.from(items[1].children).map((item) => {
    console.log("item", item.innerText);
    return item.innerText;
  });
  const doneTasks = Array.from(items[2].children).map((item) => {
    console.log("item", item.innerText);
    return item.innerText;
  });
  console.log("newTasks", newTasks);
  console.log("goingTasks", goingTasks);
  console.log("doneTasks", doneTasks);
  const storageObj = {
    newTasks,
    goingTasks,
    doneTasks,
  };
  localStorage.setItem("DragNDropTasks", JSON.stringify(storageObj));
}
