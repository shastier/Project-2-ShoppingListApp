const Cart = require('../models/Cart');

const cartsController = {};

// show cart items by user_id
const userCartId = 1; // find out the user's cart id.

cartsController.show = (req, res, next) => {
    Cart.getItems(userCartId)
      .then((items) => {
        res.locals.items = items;
        next();
      })
      .catch(next);
  };

module.exports = cartsController;