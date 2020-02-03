const h1 = document.querySelector("h1");
const squares = document.querySelectorAll(".square");
const response = document.querySelector("#response");
const displayColor = document.querySelector("#displayColor");
const resetButton = document.querySelector("#resetButton");
const easyButton = document.querySelector("#easyButton");
const hardButton = document.querySelector("#hardButton");

let displayFormat = "hex";
let numberFormat = "rel";
let level = "hard";
let noOfBoxes = 6;
let colors = [];
let pickedColor;
let clickedColor;

const toggleDisplayFormat = () => {
    displayFormat = displayFormat === "hex" ? "rgb" : "hex";
    displayColorFormat();
};
const toggleNumberFormat = () => {
    numberFormat = numberFormat === "rel" ? "abs" : "rel";
    displayColorFormat();
};
const printColors = () => {
    for (let i = 0; i < noOfBoxes; i++) {
        squares[i].style.backgroundColor = rgbString(colors[i]);
    }
    for (let i = 3; i < 6; i++) {
        if (level === "hard") {
            squares[i].style.display = "block";
        } else {
            squares[i].style.display = "none";
        }
    }
};
const newGame = () => {
    noOfBoxes = level === "hard" ? 6 : 3;
    colors = [];
    for (let i = 0; i < noOfBoxes; i++) {
        colors.push(new color());
    }
    pickedColor = colors[randbw(0, noOfBoxes - 1)];
    printColors();
    displayColorFormat();

    if (level === "hard") {
        hardButton.classList.add("selected");
    } else {
        easyButton.classList.add("selected");
    }
};
const reset = () => {
    newGame();
    h1.style.backgroundColor = "steelblue";
    resetButton.textContent = "New Colors";
    response.textContent = "";
};
const gameWon = () => {
    let hex = hexString(pickedColor);
    response.textContent = "Well Done";
    resetButton.textContent = "Another Game";
    h1.style.backgroundColor = hex;
    for (const square of squares) {
        square.style.backgroundColor = hex;
    }
};
const gameLost = thisBox => {
    response.textContent = "Try Again";
    thisBox.style.backgroundColor = "#232323";
};
const toggleLevelButton = () => {
    level = level === "hard" ? "easy" : "hard";
    easyButton.classList.toggle("selected");
    hardButton.classList.toggle("selected");
    reset();
};
const displayColorFormat = () => {
    let color;
    if (displayFormat === "rgb") {
        if (numberFormat === "abs") {
            color = pickedColor;
        } else {
            color = pickedColor.rel();
        }
        displayColor.textContent = rgbString(color);
    } else if (displayFormat === "hex") {
        if (numberFormat === "abs") {
            color = pickedColor.hex();
        } else {
            color = pickedColor.rel();
        }
        let HTML = "";
        HTML += '#<span id="R">' + color.r;
        HTML += '</span><span id="G">' + color.g;
        HTML += '</span><span id="B">' + color.b + "</span>";
        displayColor.innerHTML = HTML;
    }
};

newGame();
