const Player = require('./player')
const Character = require('./Hayley')

class TRB {

    constructor() {
        this.locationName = "TRB";
        this.noEnterMessage = "Looks like no one is here. The doors are locked and you have no key. Try coming back at a later time.";
    }

    getName() {
        return this.locationName;
    }

    getNoEnterMessage() {
    	return this.noEnterMessage;
    }

    canEnter(player) {
    /* Checks if player can enter this location at this time.
    	param player: player object, player who enters
    */
        if (player.ifLocComp(this.getName()) && !player.gotWrongInfo() && player.ifLocComp("Downtown")) {
            return true;
        } else if (player.ifLocComp("Home") && !player.gotWrongInfo() && !player.ifLocComp(this.getName())) {
            return true;
        } else if (player.gotWrongInfo() && player.ifLocComp("TheLand") && !player.ifLocComp(this.getName())) {
            return true;
        } else if (player.gotWrongInfo() && player.ifLocComp("Downtown") && !player.ifLocComp(this.getName())) {
            return true;
        } else {
            return false;
        }
    }

    enterLocation(player, character) {
    /* Player enters this location.
    	param player: player object, player who enters
    */	
    	if (!this.canEnter(player)) {
    		return this.getNoEnterMessage();
    	} else if (!character.getMetPlayers().includes(player.getName())) {
            return character.talk(player);
        } else {
            return character.talk(player, "rBribe");
        }
    }

    // goToGame() {
    //     return "Going to Game."
    // }

    // returnFromGame(player, character) {
    //     if (this.character.getBribeCount() > 0) {
    //         return character.talk(player, "rGameEnd2");
    //     } else {
    //         return character.talk(player, "rGameEnd1");
    //     }
    // }
}
module.exports = TRB;
