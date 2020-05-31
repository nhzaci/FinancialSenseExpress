const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// GET all-time transaction balance
router.get('/', async (req, res) => {
    console.log("GET @ " + req.baseUrl + req.url);
    try {
        const expenditure = await Post
            .find({ type: "Expenses" })
            .map( function(x) { return x.money });
        console.log(expenditure.reduce((x, y) => x + y, 0));
        res.status(200).send(expenditure);
    } catch (error) {
        console.log("Error 500 " + error);
        res.status(500).send(error);
    }
});


module.exports = router;