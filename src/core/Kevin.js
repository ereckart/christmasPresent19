const Player = require('./player')

class Kevin {

    constructor(playerCount) {
        this.bribed = false;
        this.metPlayers = [];
        this.r1Options = [("A", "I heard you might know where Liz went. Do you?"), 
                            ("B", "Screw you!"), 
                            ("C", "Thank you.")];
        this.r2Options = [("A", "What was that? She threatened you? Listen, don't worry about her. I can guarantee your safety. Please, just tell me what you know!"), 
                            ("B", "Oh you wuss - man up! There are lives at stake here!!"),
                            ("C", "Interesting.")];
        this.r3Options = [("A", "Where is she? Where is Liz? Tell me, or else Liz won't be the only one threatening you."), 
                            ("B", "Look, I'm sorry. I just want to know where Liz took Adelina."), 
                            ("C", "You know what I want. You know what I need. Or maybe you don't. Gimme some infooo.")];
        this.rBribeOptions = [("A", "Shout, 'I trusted you!!' as you leave."), 
                                ("B", "Leave without saying anything."), 
                                ("C", "Shout, 'You're the worst!' as you leave.")];
    }

    sayHi(player) {
        if (!this.metPlayers.includes(player.getName())) {
            this.metPlayers.push(player.getName());
            if (this.bribed) {
                this.bribed = false;
                return "I'm not talking to you";
            } else {
                return "Hey there, " + player.getName() + ". I'm sorry Adelina is missing."
            }
        }
    }

    sayHiSecondAttempt(player) {
        if (this.metPlayers.includes(player.getName())) {
            return "Oh it's you again. What do you want?"
        }
    }

    sayHiPostBribe(player) {
        return "Ah you're probably wondering why I sent you to the wrong place.  All I can say is someone bribed me to give you the wrong information. But, I do feel a liiiitle guilty. So I'll tell you what actually happened. Liz took Adelina to go dancing somewhere.  Hope that helps."

    }

    giveBribe(player) {
        this.bribed = true;
    }

    getMetPlayers() {
        return this.metPlayers;
    }

}
module.exports = Kevin;
