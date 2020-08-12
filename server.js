//import all dependencies
const express = require('express');
const logger = require('morgan');

//initialize the express app
const app = express();

//to see what's going on with our Express app
app.use(logger('dev'));

app.set('views', 'views');
app.set('view engine', 'ejs');
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

//index route
app.get('/', (req, res) => {
    res.render('index', {
        message: "Welcome to Shopping List App!",
    });
   // res.send("Welcom to Shopping List App!");
});

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