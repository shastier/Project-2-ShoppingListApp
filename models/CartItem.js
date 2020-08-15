const db = require('../db/config');

class CartItem {
    constructor(cartId, itemId) {
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
}

module.exports = CartItem;