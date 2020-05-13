var gameState = "INSTRUCTIONS";

// RENDERING FUNCTIONS
function init() {
    initSidePanel();
    initMainPanel();
    requestAnimationFrame(draw);
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
    drawSidePanel();
    drawMainPanel();
    if (animationActive) requestAnimationFrame(draw);
}

// GAME MECHANICS
const downTime = 250;
const pauseTime = 500;
const waitTime = 2000;
var canPush = true;
var buttons = [false, false, false, false];

var patternBank = []
var currentPattern = [];

function isPressed(n) {
    return buttons[n];
}
function clickButton(n) {
    if (canPush) {
        if (!buttons[n]) {
            buttonHasBeenClicked(n);
        }
        buttons[n] = true;
    }
}
function unclickButton(n) {
    if (canPush)
        buttons[n] = false;
}
function unclickAll() {
    for (var i = 0; i < buttons.length; i++)
        buttons[i] = false;
}
function simulatedPattern(pattern, downTime, waitTime) {
    if (pattern == null || pattern.length == 0) {
        canPush = true;
        return;   
    };
    canPush = false;
    unclickAll();
    var n = pattern.shift()
    setTimeout(() => {
        buttons[n] = true;
    }, waitTime);
    setTimeout(() => {
        buttons[n] = false;
        simulatedPattern(pattern, downTime, waitTime);
    }, waitTime + downTime);

}
function buttonHasBeenClicked(n) {
    if (currentPattern.length == 0) return;
    var target = currentPattern.shift();
    if (target == n) {
        startRound();
    } else {
        gameState = "FAILED";
    }
}
function startGame(n) {
    gameState = "GAME";
    patternBank = [];
    for (var i = 3; i <= 8; i++) {
        var newPattern = [];
        for (var x = 0; x < i; x++) {
            newPattern.push(Math.floor(Math.random() * 4));
        }
        patternBank.push(newPattern);
    }
    currentPattern = [];
    startRound();
}
function startRound() {
    if (currentPattern.length == 0) {
        if (patternBank.length == 0) {
            return challengeComplete();
        }
        currentPattern = patternBank.shift();
        setTimeout(() => { 
            simulatedPattern(currentPattern.slice(), downTime, pauseTime)
        }, waitTime);
    }
}
function challengeComplete() {
    gameState = "CHALLENGE_COMPLETE";
    setTimeout(() => {
        goTo(place, true)
    }, 5000)
}


// ANIMATION CONFIG
const buttonOffset = { x: 70, y: 100 };
const buttonSpacing = 30;
const buttonSize = 100;
const buttonTextGap = 20; // spacing between button and text;
const buttonTextRelative = { x: buttonSize / 2 - 18, y: buttonSize + buttonTextGap};


// ANIMATION MECHANICS
var mainMapBackground = new Image();
var genericBackground = new Image();
var buttonImgs = [
    { up: new Image(), down: new Image() },
    { up: new Image(), down: new Image() },
    { up: new Image(), down: new Image() },
    { up: new Image(), down: new Image() }
]
function initMainPanel() {
    mainMapBackground.src = "/map/mainMap.png";
    genericBackground.src = "/games/genericBackground.png";
    buttonImgs[0].up.src = `/games/trbGame/buttonFirstPos-1.png`;
    buttonImgs[0].down.src = `/games/trbGame/buttonFirstPos-2.png`;
    buttonImgs[1].up.src = `/games/trbGame/buttonSecondPos-1.png`;
    buttonImgs[1].down.src = `/games/trbGame/buttonSecondPos-2.png`;
    buttonImgs[2].up.src = `/games/trbGame/buttonThirdPos-1.png`;
    buttonImgs[2].down.src = `/games/trbGame/buttonThirdPos-2.png`;
    buttonImgs[3].up.src = `/games/trbGame/buttonFourthPos-1.png`;
    buttonImgs[3].down.src = `/games/trbGame/buttonFourthPos-2.png`;
}
function drawMainPanel() {
    switch (gameState) {
        case "GAME":
            renderGame();
            break;
        case "INSTRUCTIONS":
            renderInstructions();
            break;
        case "FAILED":
            renderFailed();
            break;
        case "CHALLENGE_COMPLETE":
            renderChallengeComplete();
            break;
        default:
            renderInstructions();
    }
    ctx.drawImage(genericBackground, 0, 0);
    ctx.drawImage(mainMapBackground, 0, 0);
}
function renderGame() {
    // render all cards
    renderButtons();
}
function renderButtons() {
    for (var i = 0; i < buttons.length; i++) {
        var img = isPressed(i) ? buttonImgs[i].down : buttonImgs[i].up;
        var x = buttonOffset.x + buttonSize + (i * buttonSize);
        var y =  buttonOffset.y;
        ctx.drawImage(img, x, y, buttonSize, buttonSize);
        ctx.font = `12px "Press Start 2P"`;
        ctx.fillText(`[${i+1}]`, x + buttonTextRelative.x, y + buttonTextRelative.y);
    }
}
function renderInstructions() {
    ctx.font = '12px "Press Start 2P"';
    wrapText(ctx, "Press [ENTER] to begin challenge.", 50, 150, 500, 12);
}
function renderFailed() {
    ctx.font = '12px "Press Start 2P"';
    wrapText(ctx, "You failed to teach the class!", 50, 150, 500, 12);
    wrapText(ctx, "Press [ENTER] to try again.", 50, 250, 500, 12);
}
function renderChallengeComplete() {
    ctx.font = '12px "Press Start 2P"';
    wrapText(ctx, "------ CHALLENGE COMPLETED ------", 150, 150, 500, 12)
}


// KEY LISTENERS AND CONTROL
document.onkeydown = function(e) {
    switch (e.keyCode) { 
        case 49:            // "1" KEY
        case 50:            // "2" KEY
        case 51:            // "3" KEY
        case 52:            // "4" KEY
            return clickButton(e.keyCode - 49);
        case 13:            // ENTER KEY
            return startGame();
    } 
};// KEY LISTENERS AND CONTROL
document.onkeyup = function(e) {
    switch (e.keyCode) { 
        case 49:            // "1" KEY
        case 50:            // "2" KEY
        case 51:            // "3" KEY
        case 52:            // "4" KEY
            return unclickButton(e.keyCode - 49);
    } 
};
// FEEDBACK AND CONTROLS
function mouseClickHappened(xCoord, yCoord) {
    // do nothing
}