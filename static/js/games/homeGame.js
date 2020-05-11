var gameState = "INSTRUCTIONS_1";

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

function continueAction() {
    switch (gameState) {
        case "INSTRUCTIONS_1":
            return gameState = "ACTIVE";
        case "FAILED":
            return gameState = "ACTIVE";
    }
}
function gameWon() {
    if (gameState != "COMPLETED") 
        setTimeout(() => goTo(place, true), 5000);
    gameState = "COMPLETED";
}
function gameFailed() {
    gameState = "FAILED";
    resetPlayer();
}

// GAMEPLAY CONFIG
const gravity = 1.25;         // gravity acceleration in px/s^2
const jumpVelo = 400;        // jump velocity in px/s
const walkingVelo = 130;     // walking speed in px/s


const obstacles = [200, 400, 600, 800]
const courseLength = 1000;

const g = gravity / 1000;   // gravity in px/ms^2
const jumpV = jumpVelo / 1000;
const walkV = walkingVelo / 1000;
// GAMEPLAY VARIABLES
const fieldOfView = 720; // FIELD OF VIEW IN PIXELS
var playerP = { x: 0, y: 0};
var playerV = { x: walkV, y: 0};
var playerA = { x: 0, y: g};
var playerLastUpdated = 0;
var obstacleHashed = null;
function resetPlayer() {
    playerP = { x: 0, y: 0};
    playerV = { x: walkV, y: 0};
    playerLastUpdated = 0;
}
function getPlayerY() {
    return playerP.y;
}
function playerIsWalking() {
    return playerP.y <= 0;
}
function updatePlayerLocation() {
    if (playerLastUpdated == 0) {
        playerLastUpdated = Date.now();
    } else {
        const timeNow = Date.now();
        const dt = timeNow - playerLastUpdated;
        playerLastUpdated = timeNow;
        // UPDATE POSITION
        playerP.x += dt * playerV.x;
        playerP.y += dt * playerV.y;
        playerP.y = Math.max(playerP.y, 0);
        // UPDATE VELOCITY
        playerV.x += dt * playerA.x;
        if (playerIsWalking()) {
            playerV.y = 0;
        } else {
            playerV.y -= dt * playerA.y;
        }
    }
    
}
function jump() {
    if (playerIsWalking())
        playerV.y = jumpV;
}
function getPercentDone() {
    if (playerP.x > courseLength) gameWon();
    return playerP.x / courseLength;
}
function getNearObstacles() {
    return obstacles;
}

// ANIMATION CONFIG
const playerJumpFrame = 1;
const animationFPS = 8;
const groundLevel = 317;
const playerOffsetX = 30;
const obstacleGroundLevel = 317;
// ANIMATION VARIABLES
var playerFrame = 0;
var obstacleFrame = 0;
// ANIMATION IMAGES
var mainMapBackground = new Image();
var mainBackground = new Image();
var instructionsBackground = new Image();
var playerAnimation = [ new Image(), new Image(), new Image(), new Image() ]
var obstacleAnimation = [ new Image(), new Image(), new Image(), new Image() ]
function initMainPanel() {
    mainMapBackground.src = "/map/mainMap.png";
    mainBackground.src = "/games/homeGame/homeGameBackground.png";
    instructionsBackground.src = "/map/messageBackground.png";
    playerAnimation[0].src = `/characterAnimations/${player}/${player}WalkRight-1.png`;
    playerAnimation[1].src = `/characterAnimations/${player}/${player}WalkRight-2.png`;
    playerAnimation[2].src = `/characterAnimations/${player}/${player}WalkRight-1.png`;
    playerAnimation[3].src = `/characterAnimations/${player}/${player}WalkRight-3.png`;
    obstacleAnimation[0].src = `/characterAnimations/${player}/${player}WalkLeft-1.png`;
    obstacleAnimation[1].src = `/characterAnimations/${player}/${player}WalkLeft-2.png`;
    obstacleAnimation[2].src = `/characterAnimations/${player}/${player}WalkLeft-1.png`;
    obstacleAnimation[3].src = `/characterAnimations/${player}/${player}WalkLeft-3.png`;
}
function drawMainPanel() {
    switch (gameState) {
        case "INSTRUCTIONS_1":
            return drawInstructionsOne();
        case "FAILED":
            return drawFailed();
        case "ACTIVE":
        case "COMPLETED":
            return drawGame();
    }
}
function drawGame() {
    drawPlayer();
    drawObstacles();
    drawPercentBar();
    if (gameState == "COMPLETED") drawCompletedSign();
    wrapText(ctx, "Press [ENTER] to begin");
    ctx.drawImage(mainBackground, 0, 0);
    ctx.drawImage(mainMapBackground, 0, 0);
}
function drawPlayer() {
    updatePlayerLocation();
    if (playerIsWalking()) {
        ctx.drawImage(playerAnimation[playerFrame], playerOffsetX, groundLevel - playerP.y);
    } else {
        ctx.drawImage(playerAnimation[playerJumpFrame], playerOffsetX, groundLevel - playerP.y);
    }
}
function drawObstacles() {
    const closeObstacles = getNearObstacles();
    for (var i = 0; i < closeObstacles.length; i++)
        drawSingleObstacle(closeObstacles[i]);
}
function drawSingleObstacle(n) {
    ctx.drawImage(
        obstacleAnimation[obstacleFrame], 
        n - playerP.x + playerOffsetX, 
        groundLevel
    );
}
function drawCompletedSign() {
    ctx.font = '12px "Press Start 2P"';
    wrapText(ctx, "------ CHALLENGE COMPLETED ------", 150, 150, 500, 12)
}

const mapBarX = 30;
const mapBarY = 30;
const mapBarW = 650;
const mapBarH = 20;
const finishLineBoxCount = 5;
function drawPercentBar() {
    const p = Math.min(getPercentDone(), 1);
    const boxSize = mapBarH / finishLineBoxCount;
    for (var i = 0; i < finishLineBoxCount; i++) {
        const offsetX = boxSize * ((i % 2) + 1);
        ctx.fillRect(mapBarX + mapBarW - offsetX, mapBarY + (i*boxSize), boxSize, boxSize);
        ctx.fillRect(mapBarX + mapBarW - boxSize, mapBarY, boxSize, boxSize);
    }
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(mapBarX + (mapBarW * p), mapBarY, mapBarW - (mapBarW * p), mapBarH);
    ctx.fillStyle = '#000000';
    ctx.fillRect(mapBarX, mapBarY, mapBarW * p, mapBarH);
}
setInterval(() => {
    playerFrame = (playerFrame + 1) % playerAnimation.length;
    obstacleFrame = (obstacleFrame + 1) % obstacleAnimation.length;
}, 1000/animationFPS)

function drawInstructionsOne() {
    ctx.font = '12px "Press Start 2P"';
    wrapText(ctx, "Press [ENTER] to begin challenge.", 50, 150, 500, 12)
    ctx.drawImage(instructionsBackground, 0, 0);
    ctx.drawImage(mainMapBackground, 0, 0);
}
function drawFailed() {
    ctx.font = '12px "Press Start 2P"';
    wrapText(ctx, "What kind of protection are you! Press [ENTER] to try again.", 50, 150, 500, 12)
    ctx.drawImage(instructionsBackground, 0, 0);
    ctx.drawImage(mainMapBackground, 0, 0);
}

// KEY LISTENERS AND CONTROL
document.onkeydown = function(e) {
    switch (e.keyCode) { 
        case 32:            // SPACE BAR
            return jump();
        case 13:            // ENTER KEY
            return continueAction();
    } 
};