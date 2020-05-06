const Player = require('./player')

class Mickey {

    r1 = {
        dialogue: "",
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
        this.location = "Eegees";
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
module.exports = Mickey;
