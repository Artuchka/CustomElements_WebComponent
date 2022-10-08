const buttonAdd = document.getElementById("addButton")
const buttonUpdate = document.getElementById("updateButton")
const buttonRemove = document.getElementById("removeButton")
const squareContainer = document.getElementById("squareContainer")

buttonAdd.addEventListener("click", addSquare)
buttonUpdate.addEventListener("click", updateSquare)
buttonRemove.addEventListener("click", removeSquare)

buttonUpdate.disabled = true
buttonRemove.disabled = true

function addSquare() {
	const square = document.createElement("custom-square")

	square.setAttribute("size", "50px")
	square.setAttribute("color", "blue")

	squareContainer.appendChild(square)

	buttonAdd.disabled = true
	buttonUpdate.disabled = false
	buttonRemove.disabled = false
}
function updateSquare() {
	const square = squareContainer.querySelector("custom-square")

	square.setAttribute("size", getSize())
	square.setAttribute("color", getColor())
}
function removeSquare() {
	const square = squareContainer.querySelector("custom-square")
	square.remove()

	buttonAdd.disabled = false
	buttonUpdate.disabled = true
	buttonRemove.disabled = true
}

function randomNumber(min, max) {
	return Math.round(Math.random() * (max - min) + min)
}

function getSize() {
	return `${randomNumber(50, 150)}px`
}

function getColor() {
	return `#${randomNumber(0, 9)}${randomNumber(0, 9)}${randomNumber(0, 9)}`
}
