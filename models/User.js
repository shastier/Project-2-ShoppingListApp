const db = require('../db/config');
const Item = require('./Item');

class User {
    constructor({ id, name, last_name, email, username, password_digest }) {
        this.id = id || null;
        this.name = name;
        this.last_name = last_name;
        this.email = email;
        this.username = username;
        this.password_digest = password_digest;
    }

    static findByUserName(username) {
        return db
        .oneOrNone('SELECT * FROM users WHERE username = $1', username)
        .then((user) => {
            if (user) return new this(user);
            else throw new Error('User not found');
        });
    }

    save() {
        return db
        .one(
            `INSERT INTO users (name, last_name, email, username, password_digest )
            VALUES ($/name/, $/last_name/, $/email/, $/username/, $/password_digest/)
            RETURNING *`,
            this
        )
        .then((savedUser) => Object.assign(this, savedUser));
    }

    findUserItems() {
        return db
        .manyOrNone('SELECT * FROM items WHERE user_id = $1', this.id)
        .then((items) => {
            return items.map((item) => new Item(item));
        });
    }
}

module.exports = User;