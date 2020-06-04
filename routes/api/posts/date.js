const express = require('express');
const router = express.Router();
const Post = require('../../../models/Post');

// GET year and month transactions
router.get('/:year/:month', async (req, res, next) => {
    //Specify start and end-dates to find
    let start = new Date(req.params.year, req.params.month - 1, 1);
    let end = new Date(req.params.year, req.params.month, 1);

    //console.log("start: " + start + " end: " + end);
    try {
        const post = await Post.find({ date: {$gte: start, $lt: end} }).sort({date:-1});
        res.status(200).json(post);
    } catch (error) {
        next(error);
    }
});

//GET all years
router.get('/getYears', async (req, res, next) => {
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
        compare = function (a,b) {
            if (a.year < b.year) {
                return 1;
            } else if (a.year > b.year) {
                return -1;
            }
            return 0;
        }
        res.status(200).json(post[0].distinctYear.sort(compare));
    } catch (error) {
        next(error);
    }
});

// GET months and years
router.get('/getMonthYears', async (req, res, next) => {
    try {
        var post = await Post.aggregate([
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
        //Function for sorting returned month and years
        compare = function (a,b) {
            if (a.year < b.year) {
                return 1;
            } else if (a.year > b.year) {
                return -1;
            } else if (a.year == b.year) {
                if (a.month < b.month) {
                    return 1;
                } else if (a.month > b.month) {
                    return -1;
                }
            }
            return 0;
        }
        res.status(200).json(post[0].distinctYear.sort(compare));
    } catch (error) {
        next(error);
    }
});

module.exports = router;