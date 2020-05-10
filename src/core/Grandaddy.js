const Player = require('./player')

class Grandaddy {

    r1 = {
        dialogue: "'Hey! Do you know where Liz --' Dad: 'I'm a little busy right now. Talking to some potential buyers for the land. All of a sudden you hear coyotes howling. 'Oh these damn coyotes! I'm not leaving till I sell this F#!*ING land! Here, take my gun - oh um, don't tell Nonni about this okay? Keep me protected while I sweet talk these buyers.",
        responseOptions: {
            "r1a": "Protect Dad"
        },
        convEnd: true,
        game: true,
        coins: 0
    }

    rGameEnd1 = {
        dialogue: "Holy shit I actually did it. I actually sold the land! I'll give you a share of the money. And you can keep the gun, but you didn't get it from me, alright? Oh and I don't know where Liz is, she didn't come here, but she did tell me last night, 'I want to see mountains, Dad, mountains!'",
        responseOptions: {
            "rG1a": "Next"
        },
        convEnd: false,
        game: false,
        coins: 0
    }
    rGameEnd2 = {
        dialogue: "Holy shit I actually did it. I actually sold the land! I'll give you a share of the money. And you can keep the gun, but you didn't get it from me, alright? Oh and I don't know anything about Liz, she didn't come here - I would go ask Kevin.",
        responseOptions: {
            "rG2a": "Next"
        },
        convEnd: false,
        game: false,
        coins: 0
    }
    rGameEnd3 = {
        dialogue: "Holy shit I actually did it. I actually sold the land! I'll give you a share of the money. And you can keep the gun, but you didn't get it from me, alright? Oh and Liz didn't come here, but I think she said something last night about getting a 'real' margarita?",
        responseOptions: {
            "rG3a": "Next"
        },
        convEnd: false,
        game: false,
        coins: 0
    }

    // response to rG1a, rG2a, rG3a
    r2 = {
        dialogue: "Earned 10 coins. Gun of Destiny: The more protection the better.",
        responseOptions: {},
        convEnd: true,
        game: false,
        coins: 10
    }
    rGameEnd4 = {
        dialogue: "Grandaddy's been bit! There's blood everywhere. Grandaddy grabs ahold of you and whispers his dying word, 'Mountains.' Lose 10 coins.",
        responseOptions: {},
        convEnd: true,
        game: false,
        coins: -10
    }
    rGameEnd5 = {
        dialogue: "Grandaddy's been bit! There's blood everywhere. Grandaddy grabs ahold of you and whispers his dying words, 'Kevin knows.' Lose 10 coins.",
        responseOptions: {},
        convEnd: true,
        game: false,
        coins: -10        
    }
    rGameEnd6 = {
        dialogue: "Grandaddy's been bit! There's blood everywhere. Grandaddy grabs ahold of you and whispers his dying word, 'Margarita.' Lose 10 coins.",
        responseOptions: {},
        convEnd: true,
        game: false,
        coins: -10        
    }

    constructor() {
        this.metPlayers = [];
        this.location = "TheLand";
        this.name = "grandaddy";
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
            case "rG1a":
                player.addLocationCompleted(this.location);
                player.addItem("GunOfDestiny");
                player.addCoins(this.r2.coins);
                return this.r2;
            case "rG2a":
                player.addLocationCompleted(this.location);
                player.addItem("GunOfDestiny");
                player.addCoins(this.r2.coins);
                return this.r2;
            case "rG3a":
                player.addLocationCompleted(this.location);
                player.addItem("GunOfDestiny");
                player.addCoins(this.r2.coins);
                return this.r2;
            case "rGameEnd1":
                return this.rGameEnd1;
            case "rGameEnd2":
                return this.rGameEnd2;
            case "rGameEnd3":
                return this.rGameEnd3;
            case "rGameEnd4":
                player.addLocationCompleted(this.location);
                player.addCoins(this.rGameEnd4.coins);
                return this.rGameEnd4;                
            case "rGameEnd5":
                player.addLocationCompleted(this.location);
                player.addCoins(this.rGameEnd5.coins);
                return this.rGameEnd5;
            case "rGameEnd6":
                player.addLocationCompleted(this.location);
                player.addCoins(this.rGameEnd6.coins);
                return this.rGameEnd6;
            case "rBribe":
                return this.rBribe;     
            default:
                return this.r1;
        }
    }

}
module.exports = Grandaddy;
