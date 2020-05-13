var gameState = "INSTRUCTIONS_1";

// RENDERING FUNCTIONS
function init() {
    initSidePanel();
    initMainPanel();
    //startGame();
    requestAnimationFrame(draw);
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
    drawSidePanel();
    drawMainPanel();
    if (animationActive) requestAnimationFrame(draw);
}




// ANIMATION CONFIG
const cardWidth = 65;
const cardMargin = 5;
const boardOffsetX = 145;
const boardOffsetY = 65;

// ANIMATION VALUES
const cardHeight = cardWidth * 101 / 76;

// ANIMATION IMAGES
var mainMapBackground = new Image();
var genericBackground = new Image();
var cardBack = new Image();
var cards = {
    angie: new Image(),
    anthony: new Image(),
    dan: new Image(),
    grandaddy: new Image(),
    hana: new Image(),
    justin: new Image(),
    kevin: new Image(),
    lizthegrey: new Image(),
    lizthewhite: new Image(),
    maddie: new Image(),
    mickey: new Image(),
    nonni: new Image(),
    tim: new Image(),
}
function initMainPanel() {
    mainMapBackground.src = "/map/mainMap.png";
    genericBackground.src = "/games/genericBackground.png";
    cardBack.src = `/games/downtownGame/cardBack.png`;
    cards.angie.src = `/games/downtownGame/angieCardFront.png`;
    cards.anthony.src = `/games/downtownGame/anthonyCardFront.png`;
    cards.dan.src = `/games/downtownGame/danCardFront.png`;
    cards.grandaddy.src = `/games/downtownGame/grandaddyCardFront.png`;
    cards.hana.src = `/games/downtownGame/hanaCardFront.png`;
    cards.justin.src = `/games/downtownGame/justinCardFront.png`;
    cards.kevin.src = `/games/downtownGame/kevinCardFront.png`;
    cards.lizthegrey.src = `/games/downtownGame/lizthegreyCardFront.png`;
    cards.lizthewhite.src = `/games/downtownGame/lizthewhiteCardFront.png`;
    cards.maddie.src = `/games/downtownGame/maddieCardFront.png`;
    cards.mickey.src = `/games/downtownGame/mickeyCardFront.png`;
    cards.nonni.src = `/games/downtownGame/nonniCardFront.png`;
    cards.tim.src = `/games/downtownGame/timCardFront.png`;
}
function drawMainPanel() {
    switch (gameState) {
        case "GAME_1":
        case "GAME_2":
            renderGame();
            break;
        case "INSTRUCTIONS_1":
            renderInitInstructions();
            break;
        case "INSTRUCTIONS_2":
            renderSecondInstructions();
            break;
        case "CHALLENGE_COMPLETE":
            renderChallengeComplete();
            break;
        default:
            renderInitInstructions();
    }
    wrapText(ctx, "Press [ENTER] to begin");
    ctx.drawImage(genericBackground, 0, 0);
    ctx.drawImage(mainMapBackground, 0, 0);
}
function renderGame() {
    // render all cards
    for (var x = 0; x < cardData.length; x++) {
        for (var y = 0; y < cardData[x].length; y++) {
            renderCard(cards.angie, x, y);
        }
    }
}
function renderCard(card, x, y) {
    var xCoord = boardOffsetX + (x * (cardWidth + (2 * cardMargin))) + cardMargin;
    var yCoord = boardOffsetY + (y * (cardHeight + (2 * cardMargin))) + cardMargin;
    if (cardData[x][y].faceUp) {
        ctx.drawImage(cardData[x][y].card, xCoord, yCoord, cardWidth, cardHeight);
    } else {
        ctx.drawImage(cardBack, xCoord, yCoord, cardWidth, cardHeight);
    }
}
function renderInitInstructions() {
    ctx.font = '12px "Press Start 2P"';
    wrapText(ctx, "Press [ENTER] to begin challenge.", 50, 150, 500, 12);
}
function renderSecondInstructions() {
    ctx.font = '12px "Press Start 2P"';
    wrapText(ctx, "Round 1 complete!", 50, 150, 500, 12);
    wrapText(ctx, "Press [ENTER] to begin next round.", 50, 250, 500, 12);
}
function renderChallengeComplete() {
    ctx.font = '12px "Press Start 2P"';
    wrapText(ctx, "------ CHALLENGE COMPLETED ------", 150, 150, 500, 12)
}

// GAME CONFIG
const rows = 4;
const columns = 6;
const viewingPeriod = 3; // in seconds
const wrongMatchWait = 1;
// GAME DATA
var canClick = true;
var cardData = []
var firstCard = null;
var secondCard = null;
var swapCards = false;
var matchCount = 0;
function startGame() {
    if (gameState == "INSTRUCTIONS_1") {
        gameState = "GAME_1";
        swapCards = false;
    } else if (gameState == "INSTRUCTIONS_2") {
        gameState = "GAME_2";
        swapCards = true;
    } else {
        return;
    }
    generateCards();
    canClick = false;
    firstCard = null;
    secondCard = null;
    matchCount = 0;
    setTimeout(() => {
        console.log("FLOP");
        flipAllCards();
        canClick = true;
    }, viewingPeriod * 1000)
}
function generateCards() {
    cardData = [];
    var order = Object.keys(cards);
    order.sort(() => Math.random() - 0.5);
    order.pop();
    order = order.concat(order);
    order.sort(() => Math.random() - 0.5);
    console.log(order);
    for (var x = 0; x < columns; x++) {
        var acc = [];
        for (var y = 0; y < rows; y++) {
            var c = {
                card: cards[order[x*rows + y]],
                faceUp: true
            }
            acc.push(c)
        }
        cardData.push(acc);
    }
}
function flipAllCards() {
    for (var x = 0; x < cardData.length; x++)
        for (var y = 0; y < cardData[x].length; y++)
            cardData[x][y].faceUp = !cardData[x][y].faceUp;
}
function gameActive() {
    switch (gameState) {
        case "GAME_1":
        case "GAME_2":
            return true;
        default:
            return false;
    }
}
function processRound() {
    if (firstCard != null && secondCard != null) {
        var isMatch = firstCard.card.src == secondCard.card.src;
        if (isMatch) {
            matchCount++;
            firstCard = null;
            secondCard = null;
            if (matchCount == (rows * columns / 2))
                setTimeout(() => {
                    gameWon();
                }, 1000);
        } else {
            canClick = false;
            setTimeout(() => {
                firstCard.faceUp = false;
                secondCard.faceUp = false;
                firstCard = null;
                secondCard = null;
                canClick = true;
            }, wrongMatchWait * 1000)
        }
    } 
}
function gameWon() {
    if (gameState == "GAME_1") {
        gameState = "INSTRUCTIONS_2";
    } else if (gameState == "GAME_2") {
        gameState = "CHALLENGE_COMPLETE";
        setTimeout(() => {
            goTo(place, true)
        }, 5000)
    }
}

// FEEDBACK AND CONTROLS
function mouseClickHappened(xCoord, yCoord) {
    if (gameActive() && canClick) {
        var card = coordToCard(xCoord, yCoord);
        if (card != null) {
            if (!card.faceUp) {
                card.faceUp = true;
                if (firstCard == null) {
                    firstCard = card;
                } else {
                    secondCard = card;
                    processRound();
                }
            }
        }
    }
}
function coordToCard(xCoord, yCoord) {
    var x = Math.floor((xCoord - boardOffsetX - cardMargin)/(cardWidth + (2 * cardMargin)));
    var y = Math.floor((yCoord - boardOffsetY - cardMargin)/(cardHeight + (2 * cardMargin)));
    if (x < 0 || y < 0) return null;
    if (x >= cardData.length || y > cardData[0].length) return null;
    return cardData[x][y];
}
// KEY LISTENERS AND CONTROL
document.onkeydown = function(e) {
    switch (e.keyCode) { 
        case 32:            // SPACE BAR
            return;
        case 13:            // ENTER KEY
            return startGame();
    } 
};