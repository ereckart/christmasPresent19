const Item = require('./item')
const Location = require('./location')

class Player {

    constructor(playerName) {
        this.playerName = playerName;
        this.inventory = [];
        this.bank = 20;
        this.placesVisited = [];
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

    addLocationVisited(location) {
    	this.placesVisited.push(location.getName());
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

    hasItem(itemName) {
    /* Determines if player has a certain item.
    	param itemName: string, name of item
    */
   		if (getInventoryNames().indexOf(itemName) == -1) {
   			return false;
   		} else {
   			return true;
   		}
    }

}
module.exports = Player;
