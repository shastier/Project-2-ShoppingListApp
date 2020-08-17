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
                WHERE cart_items.cart_id = $1`, cartId)
            .then((items) => {
                return items.map((item) => {
                  return new Item(item);
                });
              });
    }
    // username match cart's description.
    static getId(username){
        return db
            .oneOrNone(`
                SELECT *  FROM carts 
                WHERE description = $1`, username                
            )
            .then((cartId) => {
                if (cartId) return new this(cartId);
                else throw new Error('User not found');
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