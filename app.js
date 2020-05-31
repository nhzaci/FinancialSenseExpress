const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');

//Import routers
const postsRoute = require('./routes/posts');
const monthYearRoute = require('./routes/months');
const amountRoute = require('./routes/amounts');

app.use(express.urlencoded({extended: true}));
app.use(express.json());


//Connect to MongoDB
mongoose.connect(process.env.DB_CONNECTION, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('Connected to Atlas, state: ' + mongoose.connection.readyState);
})

//Allow CORS
app.use((req, res, next) => {
    res.set({
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Access-Control-Allow-Headers': 'Content-Type'
    });
    next();
})

//Logging
app.use((req, res, next) => {
    console.log(`${req.method} @ ${req.baseUrl}${req.url}`);
    next();
})

//Use routes
app.use('/api/posts', postsRoute);
app.use('/api/posts/date', monthYearRoute);
app.use('/api/posts/amount', amountRoute);

//Safety net
app.use((req, res) => {
    console.log(`RESP 404 ${req.baseUrl}${req.url} is not recognised`);
    res.status(404).send(`Sorry, ${req.baseUrl}${req.url} is not recognised`);
})

//Error handling mw
app.use((err, req, res) => {
    console.log('RESP 500 ' + err);
    res.status(500).json({ message: err.message });
})

//Listen
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log("Listening on port @ " + port)
});