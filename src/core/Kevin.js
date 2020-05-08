const Player = require('./player')

class Kevin {

        r1 = {
            dialogue: "Hey there. I'm sorry Adelina is missing.",
            responseOptions: {
                "r1a": "I heard you might know where Liz went. Do you?",
                "r1b": "Screw you!",
                "r1c": "Thank you."
            },
            convEnd: false,
            game: false,
            coins: 0
        }

        // response to r1b
        r6 = {
            dialogue: "Kevin storms away. Seems like you need to work on your personal skills... Lose 5 coins. Maybe try talking to him again - but don't screw it up this time.",
            responseOptions: {},
            convEnd: true,
            game: false,
            coins: -5
        }
        
        // response to r1c and r2b
        r7 = {
            dialogue: "Kevin walks away. Seems like you can still get more information out of him...",
            responseOptions: {
            },
            convEnd: true,
            game: false,
            coins: 0
        }

        // response to r1a
        r2 = {
            dialogue: "Um you know I - I don't think I know where she went. Mmm-maybe ask someone else? I - I don't want any trouble. I'm just the boyfriend, she doesn't tell me anything. <To himself> She only threatans me.",
            responseOptions: {
                "r2a": "Oh you wuss - man up! There are lives at stake here!!",
                "r2b": "Interesting.",
                "r2c": "What was that? She threatened you? Listen, don't worry about her. I can guarantee your safety. Please, just tell me what you know!"
            },
            convEnd: false,
            game: false,
            coins: 0
        }

        // response to r2a
        r8 = {
            dialogue: "'Yeah! Mine!' Kevin storms off. Seems like you need to work on your personal skills.. Lose 5 coins. Maybe try talking to him again - but don't screw it up this time.",
            responseOptions: {},
            convEnd: true,
            game: false,
            coins: -5
        }

        // response to r2c
        r3 = {
            dialogue: "Kevin looks you up and down. 'Are you sure you can guarantee my safety? Liz can be pretty cold-hearted. If you can prove it, I'll tell you where they went.",
            responseOptions: {
                "r3a": "Proof of Safety",
            },
            convEnd: true,
            game: true,
            coins: 0
        }

        // 2nd attempt convo with Kevin
        r4 = {
            dialogue: "Oh it's you again. What do you want?",
            responseOptions: {
                "r4a": "Where is she? Where is Liz? Tell me, or else Liz won't be the only one threatening you.",
                "r4b": "Look, I'm sorry. I just want to know where Liz took Adelina.",
                "r4c": "You know what I want. You know what I need. Or maybe you don't. Gimme some infooo."
            },
            convEnd: false,
            game: false,
            coins: 0            
        }

        // response for all three: r4a, r4b, r4c
        r5 = {
            dialogue: "'Okay okay, but I need to know I'll be protected.  I've never seen Liz this crazy.' Kevin looks you up and down. 'Are you sure you can guarantee my safety? Looks like you've been skipping out on the gym recently...  If you can prove it, I'll tell you where they went.'",
            responseOptions: {
                "r5a": "Proof of Safety"
            },
            convEnd: true,
            game: true,
            coins: 0            
        }

        // response after game ends, PATH A
        rGameEnd1 = {
            dialogue: "So you can hold up against Liz.  Alright - I trust you.  All I know is that Liz took Adelina to go dancing somewhere.  Good luck.”  Right as you’re about to leave Kevin whispers, “Ya know, I’m a little short on cash.. I could ‘forget’ some information when the next person comes asking.  If you catch my drift.",
            responseOptions: {
                "rG1a": "Bribe Kevin with 5 coins.",
                "rG1b": "Ignore Kevin's offer and leave."
            },
            convEnd: false,
            game: false,
            coins: 0
        }

        // response after game ends, PATH A
        rGameEnd2 = {
            dialogue: "So you can hold up against Liz.  Alright - I trust you.  All I know is that Liz took Adelina to go exploring outside the house.  Good luck.”  Right as you’re about to leave Kevin whispers, “Ya know, I’m a little short on cash.. I could ‘forget’ some information when the next person comes asking.  If you catch my drift.",
            responseOptions: {
                "rG2a": "Bribe Kevin with 5 coins.",
                "rG2b": "Ignore Kevin's offer and eave."
            },
            convEnd: false,
            game: false,
            coins: 0
        }

        // response to rG1a and rG2a
        rGameEnd3 = {
            dialogue: "",
            responseOptions: {},
            convEnd: true,
            game: false,
            coins: -5
        }
        // response to rG1b and rG2b   
        rGameEnd4 = {
            dialogue: "",
            responseOptions: {},
            convEnd: true,
            game: false,
            coins: 0
        }     

        rBribe = {
            dialogue: "Ah you’re probably wondering why I sent you to the wrong place .  All I can say is someone bribed me to give you the wrong information.  But, I do feel a liiittle guilty. So I’ll tell you what actually happened.  Liz took Adelina to go dancing somewhere.  Hope that helps.",
            responseOptions: {
                "rBa": "Shout, 'I trusted you!!' as you leave.",
                "rBb": "Leave without saying anything.",
                "rBc": "Shout, 'You're the worst!' as you leave.",
            },
            convEnd: false,
            game: false            
        }

        // response to rBa
        rBribe2 = {
            dialogue: "You've successfully guilt tripped Kevin. He pays you 5 coins.",
            responseOptions: {},
            convEnd: true,
            game: false,
            coins: 5
        }

        // response to rBb and rBc
        rBribe3 = {
            dialogue: "",
            responseOptions: {},
            convEnd: true,
            game: false,
            coins: 0
        }

    constructor() {
        this.bribeCount = 0;
        this.metPlayers = [];
        this.location = "Home";
        this.locationSecondary = "Home2";
    }

    getBribeCount() {
        return this.bribeCount;
    }

    giveBribe(player) {
        this.bribeCount += 1;
    }

    giveWrongInfo(player) {
        this.bribeCount -= 1;
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
            case "r1b":
                player.addCoins(this.r6.coins);
                return this.r6;
            case "r1c":
                return this.r7;
            case "r2a":
                player.addCoins(this.r8.coins);
                return this.r8;
            case "r2b":
                return this.r7;
            case "r2c":
                return this.r3;            
            case "r4a":
                return this.r5;
            case "r4b":
                return this.r5;
            case "r4c":
                return this.r5;
            case "rG1a":
                player.addCoins(this.rGameEnd3.coins);
                player.setBribedKevin(true);
                this.giveBribe(player);
                player.addLocationCompleted(this.location);
                return this.rGameEnd3;
            case "rG1b":
                player.addLocationCompleted(this.location);
                return this.rGameEnd4;
            case "rG2a":
                player.addCoins(this.rGameEnd3.coins);
                player.setBribedKevin(true);
                this.giveBribe(player);
                player.addLocationCompleted(this.location);
                return this.rGameEnd3;
            case "rG2b":
                player.addLocationCompleted(this.location);
                return this.rGameEnd4;
            case "rBa":
                player.addCoins(this.rBribe2.coins);
                player.addLocationCompleted(this.locationSecondary);
                return this.rBribe2;            
            case "rBb":
                player.addLocationCompleted(this.locationSecondary);
                return this.rBribe3; 
            case "rBc":
                player.addLocationCompleted(this.locationSecondary);
                return this.rBribe3; 
            case "r1":
                return this.r1;
            case "r4":
                return this.r4;
            case "rGameEnd1":
                return this.rGameEnd1;
            case "rGameEnd2":
                this.giveWrongInfo(player);
                player.setWrongInfo(true);
                return this.rGameEnd2;
            case "rBribe":
                return this.rBribe;         
            default:
                return this.r1;
        }
    }

}
module.exports = Kevin;
