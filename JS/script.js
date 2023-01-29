// Current Player
let activePlayer = "X";
// This stores array moves, it determines winners
let selectedSquares = [];

// This function places X or O
function placeXO(squareNumber) {
    /* This condition ensures that a square hasn't been selecter before
    We use .some here to check if each element of the selectedSquares array
    to see if it contains the square number clicked on */
    if (!selectedSquares.some(element => element.includes(squareNumber))) {
        // Here we retrieve the Id of clicked element
        let select = document.getElementById(squareNumber)
        // This condition check which players turn it is and we'll place X.png for X
        if (activePlayer === "X") {
            select.style.backgroundImage ="url('Images/x.png')";
        }
        // o.png for O
        else {
            select.style.backgroundImage = "url('Images/o.png')";
        }
        // squareNumber and activePlayer are concatenated together and added to array
        selectedSquares.push(squareNumber + activePlayer);
        // Here we check if anyone Won after their move
        checkWinConditions();
        // Here we change player after their move
        if (activePlayer === "X") {
            activePlayer = "O";
        }
        else {
            activePlayer = "X";
        }

        // This function plays found when someone makes their move
        audio("./Media/place.mp3")
        // Here we check if it is computers turn
        if (activePlayer === "O") {
            // We disable click for computers choice
            disableClick()
            // This function waits for a second before placing image and enables click
            setTimeout(function () {computersTurn();}, 1000);
        }
        // Returning true is needed for our computerTurn() function to Work.
        return true;
    }

    // This function results in a random square being selected
    function computersTurn() {
        // We use this Boolean for our Loop
        let success = false;
        // Here we will store random number 0 to 8
        let pickSquare; 
        /* This condition allows our while Loop to keep going
         if square has been selected before*/
        while(!success) {
            //We get a random number up to 8 here
            pickSquare = String(Math.floor(Math.random() * 9));
            // If random number evaluates to true, the square is empty and can be used
            if(placeXO(pickSquare)) {
                // We call the function
                placeXO(pickSquare);
                // This changes our Boolean and ends the loop
                success = true;
            };
        }
    }
}

// This function will check if Win condition is met
// and Draw a line joining the wining three signs
function checkWinConditions() {
    // X 0, 1, 2 condition.
    if (arrayIncludes("0X", "1X", "2X")) {drawWinLine(50, 100, 558, 100);}
    // X 3, 4, 5 condition.
    else if (arrayIncludes("3X", "4X", "5X")) {drawWinLine(50, 304, 558, 304);}
    // X 6, 7, 8 condition.
    else if (arrayIncludes("6X", "7X", "8X")) {drawWinLine(50, 508, 558, 508);}
    // X 0, 3, 6 condition.
    else if (arrayIncludes("0X", "3X", "6X")) {drawWinLine(100, 50, 100, 558);}
    // X 1, 4, 7 condition.
    else if (arrayIncludes("1X", "4X", "7X")) {drawWinLine(304, 50, 304, 558);}
    // X 2, 5, 8 condition.
    else if (arrayIncludes("2X", "5X", "8X")) {drawWinLine(508, 50, 508, 558);}
    // X 6, 4, 2 condition.
    else if (arrayIncludes("6X", "4X", "2X")) {drawWinLine(100, 508, 510, 90);}
    // X 0, 4, 8 condition.
    else if (arrayIncludes("0X", "4X", "8X")) {drawWinLine(100, 100, 520, 520);}

    // O 0, 1, 2 condition.
    else if (arrayIncludes("0O", "1O", "2O")) {drawWinLine(50, 100, 558, 100);}
    // O 3, 4, 5 condition.
    else if (arrayIncludes("3O", "4O", "5O")) {drawWinLine(50, 304, 558, 304);}
    // O 6, 7, 8 condition.
    else if (arrayIncludes("6O", "7O", "8O")) {drawWinLine(50, 508, 558, 508);}
    // O 0, 3, 6 condition.
    else if (arrayIncludes("0O", "3O", "6O")) {drawWinLine(100, 50, 100, 558);}
    // O 1, 4, 7 condition.
    else if (arrayIncludes("1O", "4O", "7O")) {drawWinLine(304, 50, 304, 558);}
    // O 2, 5, 8 condition.
    else if (arrayIncludes("2O", "5O", "8O")) {drawWinLine(508, 50, 508, 558);}
    // O 6, 4, 2 condition.
    else if (arrayIncludes("6O", "4O", "2O")) {drawWinLine(100, 508, 510, 90);}
    // O 0, 4, 8 condition.
    else if (arrayIncludes("0O", "4O", "8O")) {drawWinLine(100, 100, 520, 520);}
    // If all 9 squares are use and no one Won this code executes
    else if (selectedSquares.length >= 9) {
        // Tie sound plays
        audio("./Media/tie.mp3");
        // This function sets a one second timer before the game gets reset
        setTimeout(function () { resetGame();}, 1000)
    }
    // This function checks for 3 strings and if Win conditions were met
    function arrayIncludes(squareA, squareB, squareC) {
        // These variables are for 3 in a Row
        const a = selectedSquares.includes(squareA);
        const b = selectedSquares.includes(squareB);
        const c = selectedSquares.includes(squareC);
        // If passed variables return true we draw a line
        if(a === true && b === true && c === true) {return true;}
    }
}

// This function will make body element temporarily unclickable
function disableClick() {
    body.style.pointerEvents="none";
    //This will mawin-lineske it clickable again
    setTimeout(function(){body.style.pointerEvents="auto";}, 1000);
}

/* This function takes the string in a path I set earlier for placement sound*/
function audio(audioURL) {
    //We create new audio object and pass it the path as parameter
    let audio = new Audio(audioURL);
    // This plays our audio
    audio.play();
}

// We use canvas to draw lines
function drawWinLine(coordX1, coordY1, coordX2, coordY2) {
    //We access our canvas
    const canvas = document.getElementById("win-lines")
    // We get access to methods on canvas
    const c = canvas.getContext("2d");
    // This is lines X axis start
    let x1 = coordX1,
    // This is Y axis of the start of the line
    y1 = coordY1,
    // This is the lines end on X axis
    x2 = coordX2,
    // Lines end on Y axis
    y2 = coordY2,
    // Temporary X and Y data we update in animation loop
    x = x1,
    y = y1;
}

// This function interacts with Canvas
function animateLineDrawing() {
    //This is loop so when game ends it restarts
    const animationLoop = requestAnimationFrame(animateLineDrawing);
}