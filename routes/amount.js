const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// GET all-time transaction balance
router.get('/', async (req, res, next) => {
    console.log("GET @ " + req.baseUrl + req.url);
    try {
        const expenditure = await Post
            .find({ type: "Expenses" })
            .map( function(x) { return x.money });
        console.log(expenditure.reduce((x, y) => x + y, 0));
        res.status(200).send(expenditure);
    } catch (error) {
        next(error);
    }
});


module.exports = router;