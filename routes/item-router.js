const express = require('express');
const itemRouter = express.Router();

const itemsController = require('../controllers/items-controller');

// root route, /items
itemRouter.get('/', itemsController.index);

// add new item route, /items/add
itemRouter.post('/', itemsController.create);

itemRouter.get('/add', (req, res) => {
  res.render('items/add');
});

// delete an item route, /items/id
itemRouter.delete('/:id', itemsController.delete);

// show details from an specific item, /items/:id
itemRouter.get('/:id([0-9]+)', itemsController.show, (req, res) => {
    res.render('items/show', {
      item: res.locals.item,      
    });
  });

module.exports = itemRouter;