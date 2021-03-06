const Item = require('../models/Item');

const itemsController = {};

itemsController.index = (req, res, next) => {
  Item.getAll()
    .then((items) => {
      res.render('items/index', {
        message: 'ok',
        data: { items, },
        isAuthenticated: !!req.user,
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
      user_id: req.user.id,
    })
      .save()
      .then((newItem) => {
        res.redirect(`/items`)
      })
      .catch(next);
  };

itemsController.delete = (req, res, next) => {
    Item.getById(req.params.id)
    .then((item) => {
      return item.delete();
    })
    .then(() => {
      res.redirect('/items');
    })
    .catch(next);    
};

itemsController.show = (req, res, next) => {
    Item.getById(req.params.id)
      .then((item) => {
        res.locals.item = item;
        next();
      })
      .catch(next);
  };

  itemsController.update = (req, res, next) => {
    Item.getById(req.params.id)
      .then((item) => {
        return item.update(req.body);
      })
      .then((updatedItem) => {
        res.redirect(`/items/${updatedItem.id}`);
      })
      .catch(next);
  };
  
module.exports = itemsController;