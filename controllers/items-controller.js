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

itemsController.create = (req, res, next) => {
    new Item({
      name: req.body.name,
      description: req.body.description,
      img_url: req.body.img_url,
      category_id: req.body.category_id,
    })
      .save()
      .then((newItem) => {
        res.redirect(`/items`)
      })
      .catch(next);
  };

module.exports = itemsController;