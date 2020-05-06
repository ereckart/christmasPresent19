const Player = require('./player')
const Character = require('./Mickey')

class Eegees {

    constructor() {
        this.locationName = "Eegees";
        this.noEnterMessage = "Looks like it's closed. Try coming back at a later time.";
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
    	} else if (player.getNumbSandwiches() == 0) {
            return character.talk(player);
        } else if (player.getNumbSandwiches() == 1) {
            return character.talk(player);
        } else if (player.getNumbSandwiches() == 2) {
            return character.talk(player);
        } else if (player.getNumbSandwiches() == 3) {
            return character.talk(player);
        } else if (player.getNumbSandwiches() == 4) {
            return character.talk(player);
        } else if (player.getNumbSandwiches() == 5) {
            return character.talk(player);
        }
    }

    returnFromGame(player, character) {
        return character.talk(player);
    }

}
module.exports = Eegees;
