const db = require('../db/config');

class CartItem {
    constructor(cartId, itemId, id) {
      this.id = id || null;
        this.cartId = cartId;
        this.itemId = itemId;
    }

    save() {
        return db
          .one(
            `
            INSERT INTO cart_items (cart_id, item_id)
            VALUES ($/cartId/, $/itemId/)
            RETURNING *`,
            this
          )
          .then((item) => {
            return Object.assign(this, item);
          });
    }
    
    static getById(id) {
      return db
        .oneOrNone('SELECT * FROM cart_items WHERE id = $1', id)
        .then((cartItem) => {
          if (cartItem) return new this(cartItem.cartId, cartItem.itemId, cartItem.id);
          throw new Error('Item not found');
        });
    }

    // delete
    delete() {
      return db.oneOrNone('DELETE FROM cart_items WHERE id = $1', this.id);
    }
}

module.exports = CartItem;