const Player = require('./player')

class Kevin {

    r1 = {
        reply: "Hey, you look amazing today",
        options: {
            "r1a": "I heard you might know where Liz went. Do you?",
            "r1b": "Screw you!",
            "r1c": "Thank you."
        }
    }

    r2 = {
        reply: "She went to TRB!!!",
        location: "TRB"
    }

    r3 = {
        reply: "Ouch, that hurt a bit"
    }

    r4 = {
        reply: "You're welcome",
        note: "Kevin seems to have more information"
    }

    constructor(playerCount) {
        this.bribed = false;
        this.metPlayers = [];
    }


    talk(player, option) {
        if (!this.metPlayers.includes(player.getName())) {
            this.metPlayers.push(player.getName());
        }
        switch(option) {
            case "r1a":
                return this.r2;
            case "r1b":
                return this.r3;
            case "r1c":
                return this.r4;
            default:
                return this.r1;

        }
    }

    getMetPlayers() {
        return this.metPlayers;
    }


}
module.exports = Kevin;
