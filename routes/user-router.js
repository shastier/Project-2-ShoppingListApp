const express = require('express');
const userRouter = express.Router();

const usersController = require('../controllers/users-controler');
const authHelpers = require('../services/auth/auth-helpers');
const cartsController = require('../controllers/carts-controller');

userRouter.get('/', authHelpers.loginRequired, usersController.index);
userRouter.post('/', usersController.create, cartsController.createCart, cartsController.addUserCart,
   (req, res) => {
    res.render('dashboard/index'); // user home page    
});
userRouter.get('/new', authHelpers.loginRedirect, (req, res) => {
  res.render('auth/register');
});

module.exports = userRouter;

// usersController.addCart,