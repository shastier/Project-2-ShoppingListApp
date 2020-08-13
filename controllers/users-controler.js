const bcrypt = require('bcryptjs');
const User = require('../models/User');

const usersController = {
    index(req, res, next) {
        req.user.findUserItems()
        .then((items) => {
            res.json({
                message: 'Put a user profile page on this route',
                data: {
                    user: req.user,
                    items,
                },
            });
        })
        .catch(next);
    },
    create(req, res, next) {
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(req.body.password, salt);
        new User({
            name: req.body.name,
            last_name: req.body.last_name,
            email: req.body.email,
            username: req.body.username,
            password_digest: hash,
        })
        .save()
        .then((user) => {
            req.login(user, (err) => {
                if (err) return next(err);
                res.redirect('/user'); // user home page
            });
        })
        .catch(next);    
    },
};

module.exports = usersController;