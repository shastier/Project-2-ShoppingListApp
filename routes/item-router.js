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

module.exports = itemRouter;