const db = require('../db/config');

class Item {
  constructor(item) {
    this.id = item.id || null;
    this.name = item.name;
    this.description = item.description;
    this.quantity = item.quantity;
    this.is_selected = item.is_selected;
    this.img_url = item.img_url;
    this.category_id = item.category_id;
    this.user_id = item.user_id;
  }

  static getAll() {
    return db
      .manyOrNone('SELECT * FROM items ORDER BY category_id ASC')
      .then((items) => {
        return items.map((item) => {
          return new this(item);
        });
      });
  }

  static getById(id) {
    return db
      .oneOrNone('SELECT * FROM items WHERE id = $1', id)
      .then((item) => {
        if (item) return new this(item);
        throw new Error('Item not found');
      });
  }

  save() {
    return db
      .one(
        `
        INSERT INTO items (name, description, img_url, category_id)
        VALUES ($/name/, $/description/, $/img_url/, $/category_id/)
        RETURNING *`,
        this
      )
      .then((item) => {
        return Object.assign(this, item);
      });
  }
  
  delete() {
    return db.oneOrNone('DELETE FROM items WHERE id = $1', this.id);
  }

  update(changes) {
    Object.assign(this, changes);
    return db
      .oneOrNone(
        `
      UPDATE items SET
        name = $/name/,
        description = $/description/,
        img_url = $/img_url/,
        category_id = $/category_id/,
        quantity = $/quantity/
      WHERE id = $/id/
      RETURNING *
    `,
        this
      )
      .then((item) => {
        return Object.assign(this, item);
      });
  }
}

module.exports = Item;