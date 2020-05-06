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
        if (player.ifLocComp("TRB") && player.gotWrongInfo() && !player.ifLocComp(this.getName())) {
            return true;
        } else if (player.ifLocComp("Downtown") && !player.gotWrongInfo() && !player.ifLocComp(this.getName())) {
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
            // first time meeting
            return character.talk(player);
        } else {
            //2nd attempt convo
            return character.talk(player, "r10");
        } 
    }

    returnFromGame(player, character) {
        if (player.getNumbSandwiches == 0) {
            return character.talk(player, "r10");
        } else if (player.getNumbSandwiches() == 1) {
            return character.talk(player, "r4");
        } else if (player.getNumbSandwiches() == 2) {
            return character.talk(player, "r5");
        } else if ((player.getNumbSandwiches() == 3  && !player.gotHarderInfo()) || (player.getNumbSandwiches() == 4 && player.gotHarderInfo())) {
            if (!player.gotWrongInfo()) {
                //PATH A, not Mickey bribed - 3rd sandwich/ PATH A, Mickey bribed - 4th sandwich
                return character.talk(player, "r6");
            } else {
                if (!player.getBribedKevin()) {
                    //PATH B, not Mickey bribed - 3rd sandwich/ PATH B, Mickey bribed - 4th sandwich
                    return character.talk(player, "r7")
                } else {
                    //PATH C, not Mickey bribed - 3rd sandwich/ PATH C, Mickey bribed - 4th sandwich
                    return character.talk(player, "r8");
                }
            }            
        } else if ((player.getNumbSandwiches() == 4 && !player.gotHarderInfo()) || player.getNumbSandwiches() == 5) {
            //PATH A/B/C, not Mickey bribed - 4th and final sandwich, the bribe sandwich
            return character.talk(player, "r12");
        } else if (player.getNumbSandwiches() == 3 && player.gotHarderInfo()) {
            //PATH A/B/C, Micky bribed - 3rd sandwich
            return character.talk(player, "r9");
        }
    }

}
module.exports = Eegees;
