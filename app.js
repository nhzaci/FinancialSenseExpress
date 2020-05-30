const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');

//Import routers
const postsRoute = require('./routes/posts');
const monthYearRoute = require('./routes/months');

app.use(express.urlencoded({extended: true}));
app.use(express.json());


//Connect to MongoDB
mongoose.connect(process.env.DB_CONNECTION, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('Connected to Atlas, state: ' + mongoose.connection.readyState);
});

//Use routes
app.use('/api/posts', postsRoute);
app.use('/api/posts/date', monthYearRoute);

//Safety net
app.use((req, res, next) => {
    res.status(404).send('Sorry cannot recognise ' + req.url);
})

//Error handling mw
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
})

//Listen
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log("Listening on port @ " + port)
});