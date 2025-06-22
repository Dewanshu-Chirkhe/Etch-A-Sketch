const DEFAULT_COLOR = "#333333";
const DEFAULT_MODE = "color";
const DEFAULT_SIZE = 16;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;
let mouseDown = false;
let gridLinesVisible = true;

document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

const colorPicker = document.getElementById("colorPicker");
const colorBtn = document.getElementById("colorBtn");
const rainbowBtn = document.getElementById("rainbowBtn");
const eraserBtn = document.getElementById("eraserBtn");
const clearBtn = document.getElementById("clearBtn");
const toggleGrid = document.getElementById("toggleGrid");
const sizeValue = document.getElementById("sizeValue");
const sizeInput = document.getElementById("gridSize");
const changeBtn = document.getElementById("submit");
const grid = document.getElementById("grid");

colorPicker.oninput = (e) => setCurrentColor(e.target.value);
colorBtn.onclick = () => setCurrentMode("color");
rainbowBtn.onclick = () => setCurrentMode("rainbow");
eraserBtn.onclick = () => setCurrentMode("eraser");
clearBtn.onclick = () => reloadGrid();
toggleGrid.onclick = () => toggleGridLines();
changeBtn.onclick = () => handleSizeInput();

window.onload = () => {
    setUpGrid(DEFAULT_SIZE);
    setActiveButton(DEFAULT_MODE);
};

function setCurrentColor(newColor) {
    currentColor = newColor;
}

function setCurrentMode(newMode) {
    setActiveButton(newMode);
    currentMode = newMode;
}

function setCurrentSize(newSize) {
    currentSize = newSize;
}

function setActiveButton(mode) {
    //only one mode active at a time
    //when active it also triggers button.active in style.css
    colorBtn.classList.remove("active");
    rainbowBtn.classList.remove("active");
    eraserBtn.classList.remove("active");

    if (mode === "color") colorBtn.classList.add("active");
    else if (mode === "rainbow") rainbowBtn.classList.add("active");
    else if (mode === "eraser") eraserBtn.classList.add("active");
}

function handleSizeInput() {
    const value = parseInt(sizeInput.value);
    if (value >= 16 && value <= 64) {
        changeSize(value);
    } else {
        alert("Please enter a size between 16 and 64.");
    }
}

function changeSize(value) {
    setCurrentSize(value);
    updateSizeValue(value);
    reloadGrid();
}

function updateSizeValue(value) {
    sizeValue.innerText = `${value} x ${value}`;
}

function reloadGrid(){
    grid.innerHTML = "";
    setUpGrid(currentSize);
}

function setUpGrid(size){
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement("div");
        cell.classList.add("grid-cell");
        if (gridLinesVisible) cell.classList.add("show-border");

        cell.addEventListener("mousedown", changeColor);
        cell.addEventListener("mouseover", changeColor);

        grid.appendChild(cell);
    }
}

function changeColor(e) {
    if (e.type === "mouseover" && !mouseDown) return;

    if (currentMode === "rainbow") {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${r},${g},${b})`;
    } else if (currentMode === "color") {
        e.target.style.backgroundColor = currentColor;
    } else if (currentMode === "eraser") {
        e.target.style.backgroundColor = "white";
    }
}

function toggleGridLines() {
    gridLinesVisible = !gridLinesVisible;
    document.querySelectorAll(".grid-cell").forEach((cell) => {
        if (gridLinesVisible) {
            cell.classList.add("show-border");
        } else {
            cell.classList.remove("show-border");
        }
    });
}
  