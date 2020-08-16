const db = require('../db/config');
const Item = require('../models/Item');

class Cart {
    constructor(cart){
        this.id = cart.id || null;
        this.description = cart.description;
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

    save() {
        return db
          .one(
            `
            INSERT INTO carts (description)
            VALUES ($/description/)
            RETURNING *`,
            this
          )
          .then((cart) => {
            return Object.assign(this, cart);
          });
      }
}

module.exports = Cart;