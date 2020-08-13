const express = require('express');
const itemRouter = express.Router();

const itemsController = require('../controllers/items-controller');
const authHelpers = require('../services/auth/auth-helpers');

// root route, /items
itemRouter.get('/', itemsController.index);

// add new item route, /items/add
itemRouter.post('/', authHelpers.loginRequired, itemsController.create);

itemRouter.get('/add', authHelpers.loginRequired, (req, res) => {
  res.render('items/add');
});

// delete an item route, /items/id
itemRouter.delete('/:id', authHelpers.loginRequired, itemsController.delete);

// show details from an specific item, /items/:id
itemRouter.get('/:id([0-9]+)', itemsController.show, (req, res) => {
    res.render('items/show', {
      item: res.locals.item,      
    });
});

// edit an item route, /items/:id/edit
itemRouter.get('/:id([0-9]+)/edit', authHelpers.loginRequired, itemsController.show, (req, res) => {
    res.render('items/edit', {
        item: res.locals.item,
    });
});

// update an item route, /items/:id
itemRouter.put('/:id', authHelpers.loginRequired, itemsController.update);

module.exports = itemRouter;