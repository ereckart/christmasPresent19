var notificationsSquare = new Image();
var inventorySquare = new Image();
var nameSquarePlayer = new Image();

function initSidePanel() {
    notificationsSquare.src = `/map/notificationsSquare.png`;
    inventorySquare.src = `/map/inventorySquare.png`;
    nameSquarePlayer.src = `/map/maddieNameSquare.png`;
}

function drawSidePanel() {
    ctx.drawImage(notificationsSquare, 720, 0);
    ctx.drawImage(inventorySquare, 720, 167);
    ctx.drawImage(nameSquarePlayer, 720, 333);
}