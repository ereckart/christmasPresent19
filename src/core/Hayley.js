const Player = require('./player')

class Hayley {

    r1 = {
        dialogue: "At TRB you find Hayley - she looks quite distraught. You can tell she's been crying. 'My class.. I can't.. You.. n-need to.. teach my class.",
        responseOptions: {
            "r1a": "Teach Hayley's Class."
        },
        convEnd: true,
        game: true,
        coins: 0
    }

    rGameEnd1 = {
        dialogue: "All Hayley can get out our two words: 'Liz... Margarita...'",
        responseOptions: {},
        convEnd: true,
        game: false,
        coins: 0
    }

    rGameEnd2 = {
        dialogue: "Thanks for teaching my class - I was able to calm down a bit. Liz has gone crazy! She nearly danced us to death. The only way I could get her to stop was bribing her with Eegees! I gave her all my money. Please save Adelina! I need to get a margarita now...",
        responseOptions: {},
        convEnd: true, 
        game: false,
        coins: 0
    }

    rBribe = {
        dialogue: "Oh good you're back! I was so flustered I was worried I might have led you astray. Liz has gone crazy! She nearly danced us to death. The only way I could get her to stop was bribing her with Eegees! I gave her all my money.  Please save Adelina! I need to get a margarita now...",
        responseOptions: {},
        convEnd: true,
        game: false,
        coins: 0
    }

    constructor() {
        this.metPlayers = [];
        this.location = "TRB";
        this.locationSecondary = "TRB2";
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
            case "rGameEnd1":
                player.addLocationCompleted(this.location);
                return this.rGameEnd1;
            case "rGameEnd2":
                player.addLocationCompleted(this.location);
                return this.rGameEnd2;
            case "rBribe":
                player.addLocationCompleted(this.locationSecondary);
                return this.rBribe;     
            default:
                return this.r1;
        }
    }

}
module.exports = Hayley;
