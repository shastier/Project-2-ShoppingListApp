const bcrypt = require('bcryptjs');
const User = require('../models/User');

const usersController = {
    index(req, res, next) {        
        req.user.findUserItems()
        .then((items) => {
            res.render('dashboard/index', {
                message: 'ok',
                data: { items, },     
                isAuthenticated: !!req.user,     
                user: req.user,      
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
                res.locals.user = user;
                next();
                //redirect('/user'); // user home page
            });
        })
        .catch(next);    
    },
};

module.exports = usersController;