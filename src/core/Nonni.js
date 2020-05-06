const Player = require('./player')

class Nonni {

    r1 = {
        dialogue: "You find Mom sipping a margarita... or 4. 'Ohhh hi my baby. How are you doing? We'll find - <sniffles> - we'll find them. Do you want me to buy you a drink? They're quite tasty. You'll feel better. After my third one I sure did.'",
        responseOptions: {
            "r1a": "",
            "r1b": "",
            "r1c": ""
        },
        convEnd: false,
        game: false,
        coins: 0
    }

    constructor() {
        this.metPlayers = [];
        this.location = "Downtown";
    }

    giveWrongInfo(player) {
        return false;
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
module.exports = Nonni;
