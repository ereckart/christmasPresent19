const Player = require('./player')

class Mickey {

    r1 = {
        dialogue: "At Eegees you find Mickey eating a sandwich. 'I LOVE Eegees. Man, I've missed it. You're probably here to get info on Liz aren't you? Look I'll save us both some time - I'll keep talking if the sandwiches keep coming. Got it?",
        responseOptions: {
            "r1a": "Buy Mickey a Sandwich - 10 coins",
            "r1b": "Earn More Money",
            "r1c": "Later loser. I'll find someone who doesn't need bribing to save Adelina!"
        },
        convEnd: false,
        game: false,
        coins: 0
    }

    // response to r1c
    r2 = {
        dialogue: "Wow, you really haven't learned yet. Lose 10 coins. Mickey is your only hope right now.",
        responseOptions: {},
        convEnd: true,
        game: false,
        coins: -10
    }

    // response to r1b, r4b
    r3 = {
        dialogue: "",
        responseOptions: {},
        convEnd: true,
        game: true,
        coins: 0
    }

    // response to r1a and first sandwich bought
    r4 = {
        dialogue: "Oh man, another sandwich! I think I may have found the perfect combination of sauces for the Eegees Grinder. Liz and I were talking about it once, but that may have been awhile ago - looks like I just finished this sandwich. I think I need another one.",
        responseOptions: {
            "r4a": "Buy Mickey a Sandwich",
            "r4b": "Earn More Money",
        },
        convEnd: false,
        game: false,
        coins: -10
    }

    // respone to r4a and second sandwich bought
    r5 = {
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

    r6 = {
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

    r7 = {
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

    r8 = {
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

    r9 = {
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

    r10 = {
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

    r11 = {
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
