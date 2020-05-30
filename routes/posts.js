const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// GET all
router.get('/', async (req, res) => {
    console.log("GET @ " + req.baseUrl);
    try {
        const post = await Post.find({});
        res.status(200).send(post);
    } catch (error) {
        console.log("Error 500 " + error);
        res.status(500).send(error);
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
    const savedPost = await post.save();

    try {
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
        console.log("Error 500 " + error);
        res.status(500).json({ message: error });
    }
})

// PUT specific post
router.put('/:postId', async (req, res) => {
    const post = new Post({
        category: req.body.category,
        type: req.body.type,
        money: req.body.money,
        note: req.body.note
    });

    try {
        const savedPost = await Post.update(
            { _id: req.params.postId },
            post,
            { upsert: true }
        );
        res.status(200).json(savedPost);
    } catch (error) {
        console.log("Error 500 " + error);
        res.status(500).json({ message: error });
    }
})

//DELETE specific post
router.delete('/:postId', async (req, res) => {
    try {
        const post = await Post.remove({ _id: req.params.postId });
        res.status(200).json(post);
    } catch (error) {
        console.log("Error 500 " + error);
        res.status(500).json({ message: error });
    }
})

module.exports = router;