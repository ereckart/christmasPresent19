const Player = require('./player')

class Nonni {

    r1 = {
        dialogue: "You find Mom sipping a margarita... or 4. 'Ohhh hi my baby. How are you doing? We'll find - <sniffles> - we'll find them. Do you want me to buy you a drink? They're quite tasty. You'll feel better. After my third one I sure did.'",
        responseOptions: {
            "r1a": "Yeah a drink would be great!",
            "r1b": "I'm okay. Thank you though. Do you know anything about where Liz and Adelina might be?",
            "r1c": "How many margaritas have you had..?"
        },
        convEnd: false,
        game: false,
        coins: 0
    }

    // response to r1a
    r2 = {
        dialogue: "Liquid Courage: Looks like this could come in handy later.",
        responseOptions: {
            "r2a": "Next"
        },
        convEnd: false,
        game: false, 
        coins: 0
    }

    // response to r2
    r5 = {
        dialogue: "The conversation ends.  You may be an alcoholic, but you sure aren't a natural detective - there's more information to be gathered here.",
        responseOptions: {},
        convEnd: true,
        game: false, 
        coins: 0
    }

    // response to r1c
    r3 = {
        dialogue: "'Mmmmm I think five? No six. Oh, but it doesn't matter.' The conversation ends as Nonni leaves to buy herself another drink. Apparently you aren't a natural detective - there's more information to be gathered here.",
        responseOptions: {},
        convEnd: true,
        game: false, 
        coins: 0
    }

    //response to r1b, r6a, r6b, and r6c
    r4 = {
        dialogue: "I thought I saw them here? Oh, but that was a while ago. Maybe it was actually Grandaddy..? No, no it was Grandpa - no that doesn't seem right. Oh I'm sorry sweetie, but I can't remember.",
        responseOptions: {
            "r4a": "Help Mom Remember"
        },
        convEnd: true,
        game: true, 
        coins: 0
    }

    // second attempt convo
    r6 = {
        dialogue: "I'm so glad you didn't leave! I was having such a good time with you.",
        responseOptions: {
            "r6a": "I was having a good time too! But I really need to find Liz and Adelina. Do you know where they could be?",
            "r6b": "You've had enough drinks. Did Liz and Adelina come here?",
            "r6c": "Let's get another round! But first, can you tell me anything you remember about where Liz and Adelina might be?"
        },
        convEnd: false,
        game: false, 
        coins: 0
    }    

    rEndGame1 = {
        dialogue: "I remember now! They didn't come here - I would ask Hayley. I bet she knows!",
        responseOptions: {},
        convEnd: true,
        game: false,
        coins: 0
    }

    rEndGame2 = {
        dialogue: "I remember now! Liz didn't come here, but she did tell me last night, 'I want to see mountains, Mom, mountains!'",
        responseOptions: {},
        convEnd: true,
        game: false,
        coins: 0
    }

    rEndGame3 = {
        dialogue: "I remember now! They didn't come here - I would go back and ask Kevin again.",
        responseOptions: {},
        convEnd: true,
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
            case "r1a":
                return this.r2;
            case "r2a":
                return this.r5;
            case "r1c":
                return this.r3;
            case "r1b":
                return this.r4;
            case "r6a":
                return this.r4;
            case "r6b":
                return this.r4;
            case "r6c":
                return this.r4;
            case "r6":
                return this.r6;
            case "rEndGame1":
                player.addLocationCompleted(this.location);
                return this.rEndGame1;
            case "rEndGame2":
                player.addLocationCompleted(this.location);
                return this.rEndGame2;
            case "rEndGame3":
                player.addLocationCompleted(this.location);
                return this.rEndGame3;
            default:
                return this.r1;
        }
    }

}
module.exports = Nonni;
