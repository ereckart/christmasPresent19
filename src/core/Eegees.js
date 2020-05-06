const Player = require('./player')
const Character = require('./Mickey')

class Eegees {

    constructor() {
        this.locationName = "Eegees";
        this.noEnterMessage = "";
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
}
module.exports = Eegees;
