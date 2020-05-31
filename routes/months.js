const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// GET year and month transactions
router.get('/:year/:month', async (req, res) => {

    //Specify start and end-dates to find
    let start = new Date(req.params.year, req.params.month - 1, 1);
    let end = new Date(req.params.year, req.params.month, 1);
    end.setDate(end.getDate() - 1);

    //console.log("start: " + start + " end: " + end);
    try {
        const post = await Post.find({ date: {$gte: start, $lte: end}});
        res.status(200).send(post);
    } catch (error) {
        console.log("Error 500 " + error);
        res.status(500).send(error);
    }
});

//GET all years
router.get('/getYears', async (req, res) => {
    try {
        const post = await Post.aggregate([
            { "$project": {
                "year": {"$year": "$date" },
            }},
            {"$group": {
                "_id": null,
                "distinctYear": { "$addToSet": { 
                    "year": "$year",
                }}
            }}
        ]);
        res.status(200).json(post[0].distinctYear);
    } catch (error) {
        console.log("Error 500 " + error);
        res.status(500).send(error);
    }
})

// GET months and years
router.get('/getMonthYears', async (req, res) => {
    try {
        const post = await Post.aggregate([
            { "$project": {
                "year": {"$year": "$date" },
                "month": {"$month": "$date"}
            }},
            {"$group": {
                "_id": null,
                "distinctYear": { "$addToSet": { 
                    "year": "$year",
                    "month": "$month"
                }}
            }}
        ]);
        res.status(200).json(post[0].distinctYear);
    } catch (error) {
        console.log("Error 500 " + error);
        res.status(500).send(error);
    }
})

module.exports = router;