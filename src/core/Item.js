class Item {

    constructor(itemName) {
        this.itemName = itemName;
        this.itemDescription = "";
    }

    getName() {
        return this.itemName;
    }

    getDescription() {
        return this.itemDescription;
    }

}
module.exports = Item;
