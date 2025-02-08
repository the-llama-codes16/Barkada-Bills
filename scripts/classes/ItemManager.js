// This ItemManager class is used to keep track of the details of the item selected for edit or deletion

export class ItemManager {
    constructor() {
        this.itemName = "";
        this.itemCategory = "";
    }

    setItemName(itemName) {
        console.log(`Saving name: ${itemName}`);
        this.itemName = itemName;
    }

    getItemName() {
        console.log(`Displaying Name: ${this.itemName}`);
        return this.itemName;
    }

    setItemCategory(itemCategory) {
        console.log(`Setting category: ${itemCategory}`);
        this.itemCategory = itemCategory;
    }

    getItemCategory() {
        console.log(`Displaying category: ${this.itemCategory}`);
        return this.itemCategory;
    }
    
    clearItemInfo() {
        this.itemName = "";
        this.itemCategory = "";
    }
}

export const itemManager = new ItemManager();