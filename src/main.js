function showAlert(message, color) {
	// Update the alert message and color
	alertText.style.color = color;
	alertText.innerHTML = message;

	// Reset the animation
	alertText.style.animation = "none"; // Reset any previous animation
	alertText.offsetHeight; // Trigger reflow to restart the animation
	alertText.style.animation = "fadeInOut 2s ease-in-out";
}

function displayItems() {
	if (todo.length == 0) {
		console.log("first");
		return;
	}

	console.log("second");
	for (const item of todo) {
		let ti = document.createElement("div");
		ti.className = "todo-item";
		const todoItems = `<h5 class="todo-text">${item}</h5>
  <div class="icons">
    <i class="fa fa-pencil" aria-hidden="true" onclick="EditToDo(this)"></i>
    <i class="fa fa-trash" aria-hidden="true" onclick="DeleteToDo(this)"></i>
  </div>`;
		ti.innerHTML = todoItems;
		list.appendChild(ti);
	}
}

function EditToDo(e) {
	console.log("edit");
	console.log(e, "this edit");
	let editValue =
		e.parentElement.parentElement.querySelector(".todo-text").innerText;
	console.log(editValue, "is edit value");

	const index = todo.indexOf(editValue);

	if (index > -1) {
		todo.splice(index, 1);
	}

	// Update localStorage with the new array
	localStorage.setItem("todo-list", JSON.stringify(todo));
	e.parentElement.parentElement.remove();

	inputText.value = editValue;
}

function DeleteToDo(e) {
	console.log("delete");
	let deleteValue =
		e.parentElement.parentElement.querySelector(".todo-text").innerText;

	const index = todo.indexOf(deleteValue);

	if (index > -1) {
		todo.splice(index, 1);
	}

	// Update localStorage with the new array
	localStorage.setItem("todo-list", JSON.stringify(todo));

	// Remove the corresponding HTML element
	e.parentElement.parentElement.remove();

	document.getElementById("Alert").style.color = "green";
	alertText.innerHTML = "Item deleted successfully !";

	console.log(todo, "is updated todo list");
}

function displayItem(item) {
	console.log(todo, "is todo in display");
	console.log(item, "is item");

	let ti = document.createElement("div");
	ti.className = "todo-item";
	const todoItems = `<h5 class="todo-text">${item}</h5>
<div class="icons">
  <i class="fa fa-pencil" aria-hidden="true" onclick="EditToDo(this)"></i>
  <i class="fa fa-trash" aria-hidden="true" onclick="DeleteToDo(this)"></i>
</div>`;
	ti.innerHTML = todoItems;
	list.appendChild(ti);
}

function CreateToDoItems() {
	// Get the input element

	const inputValue = inputText.value.trim();

	if (!inputValue) {
		showAlert("Please enter a to-do item!", "red");
		return;
	}

	if (todo.includes(inputValue)) {
		console.log("1");
		showAlert("Item already present!", "red");
		return;
	} else {
		showAlert("Successfully created!", "green");
	}
	console.log("2");

	todo.push(inputValue);
	console.log(todo, "this is input value in todo");

	// Store the updated array as a JSON string
	localStorage.setItem("todo-list", JSON.stringify(todo));

	document.getElementById("todoText").value = "";
	// inputValue="";

	// displayItem(inputValue);
	displayItem(inputValue);
}
const inputText = document.getElementById("todoText");
const list = document.getElementById("todoList");
const alertText = document.getElementById("Alert");

let todo = JSON.parse(localStorage.getItem("todo-list"));
if (!todo) {
	todo = [];
}
displayItems();
console.log(todo, "is todo");
// localStorage.clear();
