const h1 = document.querySelector("h1");
const squares = document.querySelectorAll(".square");
const response = document.querySelector("#response");
const displayColor = document.querySelector("#displayColor");
const resetButton = document.querySelector("#resetButton");
const levelButton = document.querySelector("#levelButton");
const displayFormatButton = document.querySelector("#displayFormatButton");
const numberFormatButton = document.querySelector("#numberFormatButton");

let displayFormat = "hex";
let numberFormat = "rel";
let level = "hard";
let noOfBoxes = 6;
let colors = [];
let pickedColor;
let clickedColor;

const toggleDisplayFormat = () => {
    if (displayFormat === "hex") {
        displayFormat = "rgb";
        displayFormatButton.textContent = "RGB"
    } else {
        displayFormat = "hex";
        displayFormatButton.textContent = "Hex"
    }
    displayColorFormat();
};
const toggleNumberFormat = () => {
    if (numberFormat === "rel") {
        numberFormat = "abs";
        numberFormatButton.textContent = "Absolute"
    } else {
        numberFormat = "rel";
        numberFormatButton.textContent = "Relative"
    }
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

};
const reset = () => {
    newGame();
    h1.style.backgroundColor = "steelblue";
    resetButton.textContent = "New Colors";
    response.textContent = "";
};
const gameWon = () => {
    let hex = hexString(pickedColor);
    response.innerHTML = "Well<br/>Done";
    resetButton.textContent = "Another Game";
    h1.style.backgroundColor = hex;
    for (const square of squares) {
        square.style.backgroundColor = hex;
    }
};
const gameLost = thisBox => {
    response.innerHTML = "Try<br/>Again";
    thisBox.style.backgroundColor = "#232323";
};
const toggleLevelButton = () => {
    level = level === "hard" ? "easy" : "hard";
    levelButton.textContent = level;
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
for (const square of squares) {
    square.addEventListener("click", () => {
        let clickedColor = square.style.backgroundColor;
        if (clickedColor == rgbString(pickedColor)) {
            gameWon();
        } else {
            gameLost(square);
        }
    });
}
newGame();
