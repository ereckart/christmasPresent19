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
        if (player.ifLocComp("Home2")) {
            return false;
        } else if (player.ifLocComp(this.getName()) && !player.gotWrongInfo()) {
            return false;
        } else if (player.ifLocComp(this.getName()) && player.gotWrongInfo()) {
            if ((!player.getBribedKevin() && player.ifLocComp("TheLand")) || (player.getBribedKevin() && player.ifLocComp("Downtown"))) {
                return true;
            } else {
                return false;
            }
        } else if (!player.ifLocComp(this.getName())) {
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

    returnFromGame(player, character, result) {
        if (character.getBribeCount() > 0) {
            return character.talk(player, "rGameEnd2");
        } else {
            return character.talk(player, "rGameEnd1");
        }
    }
}
module.exports = Home;
