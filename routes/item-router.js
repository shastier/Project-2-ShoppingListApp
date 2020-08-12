const express = require('express');
const itemRouter = express.Router();

const itemsController = require('../controllers/items-controller');

// root route, /items
itemRouter.get('/', itemsController.index);

module.exports = itemRouter;