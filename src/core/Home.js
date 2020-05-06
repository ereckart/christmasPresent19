const Player = require('./player')
const Character = require('./Kevin')

class Home {

    constructor() {
        this.locationName = "Home";
        this.noEnterMessage = "Looks like no one is home. The doors are locked and you have no key.";
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
        if (player.ifLocComp(this.getName())) {
            return false;
        } else {
            return true;
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
        } else if (player.gotWrongInfo() && player.ifLocComp(this.getName())) {
            return character.talk(player, "rBribe");
        } else {
            return character.talk(player, "r4")
        }
    }
    
}
module.exports = Home;
