const db = require('../db/config');

class UserCart {
    constructor(userId, cartId){        
        this.userId = userId;
        this.cartId = cartId;
    }  

    save() {
        return db
          .one(
            `
            INSERT INTO users_carts (user_id, cart_id)
            VALUES ($/userId/, $/cartId/)
            RETURNING *`,
            this
          )
          .then((newUserCart) => {
            return Object.assign(this, newUserCart);
          });
    }

}

module.exports = UserCart;