const Player = require('./player')
const Character = require('./Grandaddy')

class TheLand {

    constructor() {
        this.locationName = "TheLand";
        this.noEnterMessage = "No one is here. You hear coyotes howling in the distance. Try coming back at a later time.";
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
        if (player.ifLocComp("Home") && player.gotWrongInfo() && !player.ifLocComp(this.getName())) {
            return true;
        } else if (player.ifLocComp("Eegees") && !player.gotWrongInfo() && !player.ifLocComp(this.getName())) {
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
    	} else {
            return character.talk(player);
        } 
    }

    returnFromGame(player, character, result) {
        // need a way to determine if the player won or not
        //IF THE PLAYER LOST
        if (player.determinePath() == 0) {
            //IF THE PLAYER WON
            if (result.localeCompare('won') == 0) {
                return character.talk(player, "rGameEnd1");
            } else {
                return character.talk(player, "rGameEnd4");
            }
        } else if (player.determinePath() == 1) {
            //IF THE PLAYER WON
            if (result.localeCompare('won') == 0) {
                return character.talk(player, "rGameEnd2");
            } else { 
                return character.talk(player, "rGameEnd5");
            }
        } else {
            //IF THE PLAYER WON
            if (result.localeCompare('won') == 0) {
                return character.talk(player, "rGameEnd3");
            } else {
                return character.talk(player, "rGameEnd6");
            }
        }
    }

}
module.exports = TheLand;
