const express = require('express');
const cartRouter = express.Router();

const cartsController = require('../controllers/carts-controller');
const authHelpers = require('../services/auth/auth-helpers');

// /show route, will list all items on the user's shopping list cart
cartRouter.get('/show', authHelpers.loginRequired, cartsController.show, (req, res) => {
    res.render('dashboard/show', {
        items: res.locals.items, //should be placed on locals by controller.
    })
});

module.exports = cartRouter;