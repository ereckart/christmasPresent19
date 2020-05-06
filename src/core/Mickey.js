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

    // response to r1b, r4b, r5b, r6b, r7b, r8b, r9b, r10b
    r3 = {
        dialogue: "",
        responseOptions: {},
        convEnd: true,
        game: true,
        coins: 0
    }

    // response to r1a and first sandwich bought, r10a
    r4 = {
        dialogue: "Oh man, another sandwich! I think I may have found the perfect combination of sauces for the Eegees Grinder. Liz and I were talking about it once, but that may have been awhile ago - looks like I just finished this sandwich. I think I need another one.",
        responseOptions: {
            "r4a": "Buy Mickey a Sandwich - 10 coins",
            "r4b": "Earn More Money",
        },
        convEnd: false,
        game: false,
        coins: -10
    }

    // respone to r4a and second sandwich bought
    r5 = {
        dialogue: "I know you think I'm probably crazy. How could someone eat so much?? Liz was making fun of me for it earlier, but I don't mind - she was the one buying.",
        responseOptions: {
            "r5a": "Buy Mickey a Sandwich - 10 coins",
            "r5b": "Earn More Money"
        },
        convEnd: false,
        game: false,
        coins: -10
    }

    // response to r5a/r9a and third/fourth sandwich bought - path a
    r6 = {
        dialogue: "I guess I am starting to feel a little full.. Before Liz left, Adelina would not stop repeating the name 'gerr dada'? I suggest you find this 'gerr dada'. Whoever that is. And listen, I'll sweeten the deal. If you buy me an extra sandwich I'll make it harder for the next person to get information from me.",
        responseOptions: {
            "r6a": "Buy Mickey a Sandwich - 10 coins",
            "r6b": "Earn More Money",
            "r6c": "Leave"
        },
        convEnd: false,
        game: false,
        coins: -10
    }

    // response to r5a/r9a and third/fourth sandwich bought - path b
    r7 = {
        dialogue: "I guess I am starting to feel a little full.. Before Liz left, Adelina would not stop repeating the name 'na na'? I suggest you find this 'na na'. Whoever that is. And listen, I'll sweeten the deal. If you buy me an extra sandwich I'll make it harder for the next person to get information from me.",
        responseOptions: {
            "r7a": "Buy Mickey a Sandwich - 10 coins",
            "r7b": "Earn More Money",
            "r7c": "Leave"
        },
        convEnd: false,
        game: false,
        coins: -10
    }

    // response to r5a/r9a and third/fourth sandwich bought - path c
    r8 = {
        dialogue: "I guess I am starting to feel a little full.. Before Liz left, she told me, 'I want to see mountains, Mickey, mountains!' And listen, I'll sweeten the deal. If you buy me an extra sandwich I'll make it harder for the next person to get information from me.",
        responseOptions: {
            "r8a": "Buy Mickey a Sandwich - 10 coins",
            "r8b": "Earn More Money",
            "r8c": "Leave"
        },
        convEnd: false,
        game: false,
        coins: -10
    }

    // response to r5a and third sandwich bought, with bribe
    r9 = {
        dialogue: "I don't know which I love more though: the sandwich, the fries, or the drink. It's just too hard to decide. Adelina definitely liked the fries the best though.",
        responseOptions: {
            "r9a": "Buy Mickey a Sandwich - 10 coins",
            "r9b": "Earn More Money",
        },
        convEnd: false,
        game: false,
        coins: -10
    }

    // 2nd attempt convo
    r10 = {
        dialogue: "You came crawling back - I'm not surprised.",
        responseOptions: {
            "r10a": "Buy Mickey a Sandwich - 10 coins",
            "r10b": "Earn More Money",
        },
        convEnd: false,
        game: false,
        coins: 0
    }

    // response to r6c, r7c, r8c
    r11 = {
        dialogue: "",
        responseOptions: {},
        convEnd: true, 
        game: false,
        coins: 0
    }

    // response to r6a, r7a, r8a
    r12 = {
        dialogue: "",
        responseOptions: {},
        convEnd: true, 
        game: false,
        coins: -10
    }

    constructor() {
        this.metPlayers = [];
        this.location = "Eegees";
        this.bribeCount = 0;
    }

    giveBribe() {
        this.bribeCount += 1;
    }

    giveWrongInfo(player) {
        this.bribeCount -= 1; 
    }

    getMetPlayers() {
        return this.metPlayers;
    }

    getBribeCount() {
        return this.bribeCount;
    }

    talk(player, option) {
        if (!this.metPlayers.includes(player.getName())) {
            this.metPlayers.push(player.getName());
        }
        switch(option) {   
            case "r1a":
                player.addCoins(this.r4.coins);
                player.boughtSandwich();
                return this.r4;
            case "r1b":
                return this.r3;
            case "r1c":
                player.addCoins(this.r2.coins);
                return this.r2;
            case "r4a":
                player.addCoins(this.r5.coins);
                //check if Mickey has been bribed by other players
                if (this.getBribeCount() > 0) {
                    player.setHarderInfo(true);
                    this.giveWrongInfo();
                }
                player.boughtSandwich();
                return this.r5;
            case "r4b":
                return this.r3;
            case "r5a":
                player.addCoins(-10);
                player.boughtSandwich();
                if (!player.gotHarderInfo()) {
                    if (player.determinePath()==0) {
                        //path a
                        return this.r6;
                    } else if (player.determinePath()==1) {
                        //path b
                        return this.r7;
                    } else {
                        //path c
                        return this.r8;
                    }
                } else {
                    return this.r9;
                }
            case "r5b":
                return this.r3;
            case "r6a":
                player.addCoins(this.r12.coins);
                this.giveBribe();
                player.setBribedMickey(true);
                player.addLocationCompleted(this.location);
                return this.r12;
            case "r6b":
                return this.r3;
            case "r6c":
                player.addLocationCompleted(this.location);
                return this.r11;
            case "r7a":
                player.addCoins(this.r12.coins);
                this.giveBribe();
                player.setBribedMickey(true);
                player.addLocationCompleted(this.location);
                return this.r12;
            case "r7b":
                return this.r3;                
            case "r7c":
                player.addLocationCompleted(this.location);
                return this.r11;
            case "r8a":
                player.addCoins(this.r12.coins);
                this.giveBribe();
                player.setBribedMickey(true);
                player.addLocationCompleted(this.location);
                return this.r12;
            case "r8b":
                return this.r3;
            case "r8c":
                player.addLocationCompleted(this.location);
                return this.r11;
            case "r9a":
                player.addCoins(-10);
                player.boughtSandwich();
                // need to add path variations ie r7 r8
                if (player.determinePath()==0) {
                    //path a
                    return this.r6;
                } else if (player.determinePath()==1) {
                    //path b
                    return this.r7;
                } else {
                    //path c
                    return this.r8;
                }
            case "r9b":
                return this.r3;
            case "r10a":
                player.addCoins(this.r4.coins);
                player.boughtSandwich();
                return this.r4;
            case "r10b":
                return this.r3;
            case "r10":
                return this.r10;
            default:
                return this.r1;
        }
    }

}
module.exports = Mickey;
