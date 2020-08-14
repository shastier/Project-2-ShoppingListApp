const db = require('../db/config');
const Item = require('../models/Item');

class Cart {
    constructor(user_id){
        this.user_id = user_id;
        this.description = "";
    }

    static getItems(cartId){
        return db
            .manyOrNone(`
                SELECT * FROM items
                    JOIN cart_items 
                    ON items.id = cart_items.item_id
                WHERE cart_items.cart_id = ${cartId} `)
            .then((items) => {
                return items.map((item) => {
                  return new Item(item);
                });
              });
    }
}

module.exports = Cart;