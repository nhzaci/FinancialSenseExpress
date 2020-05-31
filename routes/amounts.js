const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// GET all-time transaction balance
router.get('/', async (req, res, next) => {
    try {
        const post = await Post.find();
        res.status(200).json(post);
    } catch (error) {
        next(error);
    }
});


module.exports = router;