const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// GET all
router.get('/', async (req, res) => {
    try {
        const post = await Post.find().sort({ date: -1 });
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

// POST new
router.post('/', async (req, res) => {
    const post = new Post({
        category: req.body.category,
        type: req.body.type,
        money: req.body.money,
        note: req.body.note
    });

    try {
        const savedPost = await post.save();
        res.status(200).json(savedPost);
    } catch (error) {
        res.status(500).json({ message: error });
    }
})

// GET specific post
router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error });
    }
})

// PUT specific post
router.put('/:postId', async (req, res) => {
    const post = new Post({
        _id: req.body.id,
        category: req.body.category,
        type: req.body.type,
        money: req.body.money,
        note: req.body.note
    });

    try {
        const savedPost = await Post.update(
            { _id: req.body.id },
            post,
            { upsert: false }
        );
        res.status(200).json(savedPost);
    } catch (error) {
        res.status(500).json({ message: error });
    }
})

//DELETE specific post
router.delete('/:postId', async (req, res) => {
    try {
        const post = await Post.remove({ _id: req.params.postId });
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error });
    }
})

module.exports = router;