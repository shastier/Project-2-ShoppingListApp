const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');
const UserCart = require('../models/UserCart');
const User = require('../models/User');

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
// add an item to user's cart
cartsController.add = (req, res, next) => {
    const itemsId = req.body.cartItem;     
    if (itemsId != null) {
        const isSingleItem = ((typeof(itemsId)) === 'string');
        console.log(isSingleItem);
        if (isSingleItem) {
            // only one item was selected. 
            //req.body returns an string.
            const id = parseInt(itemsId);
            const cartItem = new CartItem(userCartId, parseInt(itemsId));
            cartItem.save();

        } else {
            // more than one item was selected. 
            // req.body returns an array.
            for (let i = 0; i < itemsId.length; i++) {
                const cartItem = new CartItem(userCartId, parseInt(itemsId[i]));
                cartItem.save();                  
            }
        }
    }    
    res.redirect('/cart/show');
    next();
};

cartsController.delete = (req, res, next ) => {
    CartItem.getById(req.params.id)
    .then((cartItem) => {
      return cartItem.delete();
    })
    .then(() => {
      res.redirect('/cart/show');
    })
    .catch(next);    
};

// create new cart
cartsController.createCart = (req, res, next) => {
    new Cart({      
      description: req.body.username,
    })
      .save()
      .then((newCart) => {
        res.locals.cart = newCart;
        next();
      })
      .catch(next);
  };

// assign a cart to an user
cartsController.addUserCart = (req, res, next) => {
    let userId = 0;
    let cartId = 0;

    User.getId(req.body.username)
        .then((user) => {
            userId = user.id;

            Cart.getId(req.body.username)
                .then((cart) => {
                    cartId = cart.id;
                    
                    new UserCart(userId, cartId)
                    .save()
                    .then((newUserCart) => {
                        res.locals.userCart = newUserCart;
                        next();
                    })
                    .catch(next);

                    next();
                })
                .catch(next);    

            next();
        })
        .catch(next);        
};

module.exports = cartsController;