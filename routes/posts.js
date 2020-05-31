const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// GET all
router.get('/', async (req, res, next) => {
    try {
        const post = await Post.find().sort({ date: -1 });
        res.status(200).json(post);
    } catch (error) {
        next(error);
    }
});

// POST new
router.post('/', async (req, res, next) => {
    console.log(req.body);
    const post = new Post(req.body);
    try {
        const savedPost = await post.save();
        res.status(200).json(savedPost);
    } catch (error) {
        next(error);
    }
})

// GET specific post
router.get('/:postId', async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.status(200).json(post);
    } catch (error) {
        next(error);
    }
})

// PUT specific post -- post updating
router.put('/:postId', async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.postId);
        post.category = req.body.category;
        post.type = req.body.type;
        post.money= req.body.money;
        post.note = req.body.note;
        await post.save();
        res.status(200).json(post);
    } catch (error) {
        next(error);
    }
})

//DELETE specific post
router.delete('/:postId', async (req, res, next) => {
    try {
        const post = await Post.deleteOne({ _id: req.params.postId });
        res.status(200).json(post);
    } catch (error) {
        next(error);
    }
})

module.exports = router;