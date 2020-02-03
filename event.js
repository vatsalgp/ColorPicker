easyButton.addEventListener("click", () => {
    if (level === "hard") {
        toggleLevelButton();
    }
});
hardButton.addEventListener("click", () => {
    if (level === "easy") {
        toggleLevelButton();
    }
});
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
resetButton.addEventListener("click", reset);
