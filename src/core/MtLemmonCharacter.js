const Player = require('./player')

class MtLemmonCharacter {

    r1 = {
        dialogue: "You get to the base of the mountain and find a book on the ground that had been left behind.  It's the Return of the King. You start to read it, might come in handy later..",
        responseOptions: {
            "r1a": "Read Return of the King"
        },
        convEnd: true, 
        game: true,
        coins: 0
    }

    constructor() {
        this.metPlayers = [];
        this.location = "MtLemmon";
    }

    getMetPlayers() {
        return this.metPlayers;
    }

    talk(player, option) {
        if (!this.metPlayers.includes(player.getName())) {
            this.metPlayers.push(player.getName());
        }
        switch(option) {   
            default:
                return this.r1;
        }
    }

}
module.exports = MtLemmonCharacter;
