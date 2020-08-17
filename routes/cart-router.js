const express = require('express');
const cartRouter = express.Router();

const cartsController = require('../controllers/carts-controller');
const authHelpers = require('../services/auth/auth-helpers');

// /show route, will list all items on the user's shopping list cart
cartRouter.get('/show', authHelpers.loginRequired, cartsController.getUserCartId, cartsController.show, (req, res) => {
    res.render('dashboard/show', {
        items: res.locals.items, //should be placed on locals by controller.
    })
});

// /add route, will move the selected items(checkbox) from index.ejs show all, to the cart
cartRouter.post('/add', authHelpers.loginRequired, cartsController.getUserCartId, cartsController.add, (req, res) => {
    res.render('dashboard/show', {
        items: res.locals.items, //should be placed on locals by controller.
    })
})

// route: /cart/items/:id, delete items_id from cart_items
// redirect to cart/show
cartRouter.delete('/show/:id([0-9]+)', authHelpers.loginRequired, cartsController.getUserCartId, cartsController.delete);

module.exports = cartRouter;