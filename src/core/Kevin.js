const Player = require('./player')

class Board {

    constructor(
        playerCount
    ) {
        this.bribed = false;
        this.metPlayers = [];
    }

    sayHi(player) {
        if (!this.metPlayers.includes(player.getName())) {
            this.metPlayers.push(player.getName());
        }
        if (this.bribed) {
            this.bribed = false;
            return "I'm not talking to you";
        } else {
            return "Hello, " + player.getName();
        }
    }

    giveBribe(player) {
        this.bribed = true;
    }

    getMetPlayers() {
        return this.metPlayers;
    }



}
module.exports = Board;
