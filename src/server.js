'use strict';
const express = require('express');
const mongoose = require('mongoose');
const errorHandler = require('./error-handlers/500');
const notFoundHandler = require('./error-handlers/404.js');
const logger = require('./middleware/logger');
const validatror = require('./middleware/validator')
const booksRouter = require('./routes/book');
const actorRouter = require('./routes/actor');
const app = express();

// Global Middleware
app.use(logger);
app.use(express.json());


// attaching our routes module to the app obj
app.use(booksRouter);
app.use(actorRouter);
app.get('/person', validatror, (req, res) => {
    const person = req.query.name;
    res.json({ name: person });
})

app.get('/', (req, res) => {
    res.status(200).send('Welcom to Our Home Page');
})

function start(port) {
    app.listen(port, () => {
        console.log('Server Connect at PORT' + port)
        mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        })
        .then(()=> console.log('conntected to mongoDB'))
        .catch((err)=> console.log(err));
    });

}


// Handlers -> Middlewares
app.use('*', notFoundHandler);
app.use(errorHandler);
// Modularity 

module.exports = {
    app: app,
    start: start
}