const Player = require('./player')

class Location {

    constructor(locationName, noEnterMessage) {
        this.locationName = locationName;
        this.noEnterMessage = noEnterMessage;
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
    	return False;
    }

    enterLocation(player) {
    /* Player enters this location.
    	param player: player object, player who enters
    */	
    	if (!canEnter(player)) {
    		print(getNoEnterMessage);
    	}
    }
    
}
module.exports = Location;
