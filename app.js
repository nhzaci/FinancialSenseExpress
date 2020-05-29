const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Import routers
const PostRouter = require('./routes/posts');

//Connect to MongoDB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
    console.log('Connected to MongoDB Atlas')
})

//Use routes
app.use('/api/posts', PostRouter);

//Listen
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log("Listening on port @ " + port)
});