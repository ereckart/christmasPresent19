var nameSquare = new Image();
var nameSquarePlayer = new Image();

function initSidePanel() {
    nameSquare.src = `/NameSquare-1.png.png`;
    nameSquarePlayer.src = `/NameSquareMaddie-1.png.png`;
}

function drawSidePanel() {
    ctx.drawImage(nameSquare, 720, 0);
    ctx.drawImage(nameSquare, 720, 166);
    ctx.drawImage(nameSquarePlayer, 720, 332);
}