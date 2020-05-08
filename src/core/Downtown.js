const Player = require('./player')
const Character = require('./Nonni')

class Downtown {

    constructor() {
        this.locationName = "Downtown";
        this.noEnterMessage = "Looks like all the bars are closed. Try coming back at a later time.";
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
        if (!player.ifLocComp(this.getName())) {
            if (player.ifLocComp("TRB") && (player.determinePath()==0)) {
                // path a
                return true;
            } else if (player.ifLocComp("Eegees") && (player.determinePath()==1)) {
                // path b
                return true;
            } else if (player.ifLocComp("TheLand") && (player.determinePath()==2)) {
                // path c
                return true;
            } else {
                return false;
            }
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
            return character.talk(player, "r6");
        }
    }

    returnFromGame(player, character, result) {
        if (player.determinePath() == 0) {
            return character.talk(player, "rEndGame1");
        } else if (player.determinePath() == 1) {
            return character.talk(player, "rEndGame2");
        } else {
            return character.talk(player, "rEndGame3");
        }
    }
}
module.exports = Downtown;
