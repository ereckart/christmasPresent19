const Item = require('./item')
//const Location = require('./Home')

class Player {

    constructor(playerName) {
        this.playerName = playerName;
        this.inventory = [];
        this.locationsCompleted = [];
        this.bank = 20;
        this.bribedKevin = false;
        this.wrongInfo = false; //true if player on receiving end of Kevin's bribe
        this.sandwichesBought = 0;
        this.bribedMickey = false;
        this.harderInfo = false; //true if player on receiving end of Mickey's bribe
    }

    getName() {
        return this.playerName;
    }

    getInventory() {
    	return this.inventory;
    }

    getInventoryNames() {
    	names = [];
    	for (var i = this.inventory.length - 1; i >= 0; i--) {
    		names.push(this.inventory[i].getName());
    	}
    	return names;
    }

    getBank() {
    	return this.bank;
    }

    getNumbSandwiches() {
        return this.sandwichesBought;
    }

    getBribedKevin() {
        return this.bribedKevin;
    }

    gotWrongInfo() {
    	return this.wrongInfo;
    }

    gotHarderInfo() {
        return this.harderInfo;
    }

    addLocationCompleted(locationName) {
    	this.locationsCompleted.push(locationName);
    }

    addItem(item) {
    /* Adds an item object to a player's inventory.
		param item: item object, item to add
    */
    	this.inventory.push(item);
    }

    addCoins(coinAmount) {
    /* Adds a specified number of coins to a player's bank.
		param coinAmount: int, number of coins to add
    */
    	this.bank += coinAmount;
    }

    removeCoins(coinAmount) {
    /* Removes a specified number of coins to a player's bank.
		param coinAmount: int, number of coins to remove
    */
    	this.bank -= coinAmount;
    }

    boughtSandwich() {
        this.sandwichesBought += 1;
    }

    setBribedKevin(bribed) {
    	this.bribedKevin = bribed;
    }

    setBribedMickey(bribed) {
    	this.bribedMickey = bribed;
    }

    setWrongInfo(bribed) {
    	this.wrongInfo = bribed;
    }

    setHarderInfo(bribed) {
    	this.harderInfo = bribed;
    }

    hasItem(itemName) {
    /* Determines if player has a certain item.
    	param itemName: string, name of item
    */
   		return this.getInventoryNames().includes(itemName);
    }

    ifLocComp(locationName) {
    	return this.locationsCompleted.includes(locationName);
    }

    determinePath() {
    //returns 0 for path a, 1 for path b, and 2 for path c
        if (!this.gotWrongInfo()) {
            return 0;
        } else if (!this.getBribedKevin()) {
            return 1;
        } else {
            return 2;
        }
    }
}
module.exports = Player;
