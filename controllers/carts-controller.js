const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');

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

cartsController.add = (req, res, next) => {
    const itemsId = req.body.cartItem; 

    if (itemsId != null) {
        for (let i = 0; i < itemsId.length; i++) {
            const cartItem = new CartItem(userCartId, parseInt(itemsId[i]));
            cartItem.save()                  
        }
    }
    
    res.redirect('/cart/show');
    next();
};

module.exports = cartsController;