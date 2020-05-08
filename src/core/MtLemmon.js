const Player = require('./player')
const Character = require('./MtLemmonCharacter')

class MtLemmon {

    constructor() {
        this.locationName = "MtLemmon";
        this.noEnterMessage = "Looks like the roads are closed off. Try coming back at a later time.";
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
        if (player.getLocationsCompleted().length == 6) {
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
            return this.talk(player);
        }
    }

    returnFromGame(player, character, result) {
        return character.talk(player);
    }

}
module.exports = MtLemmon;
