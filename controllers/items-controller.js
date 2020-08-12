const Item = require('../models/Item');

const itemsController = {};

itemsController.index = (req, res, next) => {
  Item.getAll()
    .then((items) => {
      res.render('items/index', {
        message: 'ok',
        data: { items },
      });
    })
    .catch(next);
};

module.exports = itemsController;