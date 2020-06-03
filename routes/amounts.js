const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

//map function for balance
const mapNumber = (x) => {
    if (x.type === "Expense") {
        return - Number(x.money);
    } 
    return Number(x.money);
}

// GET all-time transaction balance
router.get('/balance', async (req, res, next) => {
    try {
        const post = await Post.find();
        //Reducing empty array causes errors, so for empty, just return empty
        if (post.length === 0) {
            res.status(200).json({});
        } else {
            res.status(200).json(post
                .map(mapNumber)
                .reduce((x, y) => x + y)
            );
        }
    } catch (error) {
        next(error);
    }
});

//Get YTD balance
router.get('/balance/:year', async (req, res, next) => {
    let start = new Date(req.params.year, 1, 1);
    let end = new Date(Number(req.params.year) + 1, 1, 1);
    try {
        const post = await Post.find({ date: {$gte: start, $lt: end} });
        //Reducing empty array causes errors, so for empty, just return empty
        if (post.length === 0) {
            res.status(200).json({});
        } else {
            res.status(200).json(post
                .map(mapNumber)
                .reduce((x, y) => x + y)
            );
        }
    } catch (error) {
        next(error);
    }
})

// GET MTD balance
router.get('/balance/:year/:month', async (req, res, next) => {
    let start = new Date(req.params.year, Number(req.params.month) - 1, 1);
    let end = new Date(req.params.year, Number(req.params.month), 1);
    try {
        const post = await Post.find({ date: {$gte: start, $lt: end} });
        //Reducing empty array causes errors, so for empty, just return empty
        if (post.length === 0) {
            res.status(200).json({});
        } else {
            res.status(200).json(post
                .map(mapNumber)
                .reduce((x, y) => x + y)
            );
        }
    } catch (error) {
        next(error);
    }
})

const mapExpense = x => {
    if (x.type === "Expense") {
        return Number(x.money);
    }
    return 0;
}

// GET all-time transaction Expense
router.get('/expense', async (req, res, next) => {
    try {
        const post = await Post.find();
        //Reducing empty array causes errors, so for empty, just return empty
        if (post.length === 0) {
            res.status(200).json({});
        } else {
            res.status(200).json(post
                .map(mapExpense)
                .reduce((x, y) => x + y)
            );
        }
    } catch (error) {
        next(error);
    }
});

// GET YTD Expense
router.get('/expense/:year', async (req, res, next) => {
    let start = new Date(req.params.year, 1, 1);
    let end = new Date(Number(req.params.year) + 1, 1, 1);
    try {
        const post = await Post.find({ date: {$gte: start, $lt: end} });
        //Reducing empty array causes errors, so for empty, just return empty
        if (post.length === 0) {
            res.status(200).json({});
        } else {
            res.status(200).json(post
                .map(mapExpense)
                .reduce((x, y) => x + y)
            );
        }
    } catch (error) {
        next(error);
    }
})

// GET MTD Expense
router.get('/expense/:year/:month', async (req, res, next) => {
    let start = new Date(req.params.year, Number(req.params.month) - 1, 1);
    let end = new Date(req.params.year, Number(req.params.month), 1);
    try {
        const post = await Post.find({ date: {$gte: start, $lt: end} });
        //Reducing empty array causes errors, so for empty, just return empty
        if (post.length === 0) {
            res.status(200).json({});
        } else {
            res.status(200).json(post
                .map(mapExpense)
                .reduce((x, y) => x + y)
            );
        }
    } catch (error) {
        next(error);
    }
})

const mapIncome = x => {
    if (x.type === "Expense") {
        return 0;
    }
    return Number(x.money);
}

// GET all-time transaction Income
router.get('/income', async (req, res, next) => {
    try {
        const post = await Post.find();
        //Reducing empty array causes errors, so for empty, just return empty
        if (post.length === 0) {
            res.status(200).json({});
        } else {
            res.status(200).json(post
                .map(mapIncome)
                .reduce((x, y) => x + y)
            );
        }
    } catch (error) {
        next(error);
    }
});

// GET YTD Income
router.get('/income/:year', async (req, res, next) => {
    let start = new Date(req.params.year, 1, 1);
    let end = new Date(Number(req.params.year) + 1, 1, 1);
    try {
        const post = await Post.find({ date: {$gte: start, $lt: end} });
        //Reducing empty array causes errors, so for empty, just return empty
        if (post.length === 0) {
            res.status(200).json({});
        } else {
            res.status(200).json(post
                .map(mapIncome)
                .reduce((x, y) => x + y)
            );
        }
    } catch (error) {
        next(error);
    }
})

// GET MTD Income
router.get('/income/:year/:month', async (req, res, next) => {
    let start = new Date(req.params.year, Number(req.params.month) - 1, 1);
    let end = new Date(req.params.year, Number(req.params.month), 1);
    try {
        const post = await Post.find({ date: {$gte: start, $lt: end} });
        //Reducing empty array causes errors, so for empty, just return empty
        if (post.length === 0) {
            res.status(200).json({});
        } else {
            res.status(200).json(post
                .map(mapIncome)
                .reduce((x, y) => x + y)
            );
        }
    } catch (error) {
        next(error);
    }
})

module.exports = router;