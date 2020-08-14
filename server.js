//import all dependencies
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
// auth
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
// routers
const itemRouter = require('./routes/item-router');
const authRouter = require('./routes/auth-router');
const userRouter = require('./routes/user-router');
const cartRouter = require('./routes/cart-router');

//initialize the express app
const app = express();
// import .env, file that have secret key
require('dotenv').config();

app.use(methodOverride('_method'));

//to see what's going on with our Express app
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Auth, Setup middleware 
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// view engine 
app.set('views', 'views');
app.set('view engine', 'ejs');
app.use(express.static('public'));

// set up the port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

// index route
app.get('/', (req, res) => {
    res.render('index', {
        message: "Welcome to Shopping List App!",
    });
});
// items route
app.use('/items', itemRouter);

app.use('/auth', authRouter);
app.use('/user', userRouter);

// carts route
app.use('/cart', cartRouter);

//get anything that hasn't already been matched
app.use('*', (req, res) => {
    res.status(404).send({
        error: 'Not Found',
    });
});

// error handler
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send({
        err,
        message: err.message,
    });
});