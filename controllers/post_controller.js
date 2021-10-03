const express = require("express");
const PostController = express.Router();
const Post = require("../models/post");
const { VerifyToken } = require("../middleware/verify_token");

PostController.post("/", VerifyToken, async (req, res) => {

    const organizationId = req.body.organizationId;
    const postBody = req.body.postBody;
    const postTitle = req.body.postTitle;

    Post.create({
        organizationId: organizationId,
        body: JSON.stringify(postBody),
        title: postTitle
    }, (e, post) => {
        if (e) {
            return res.status(500).json();
        }

        res.status(200).json({
            postId: post._id,
        })
    })
});

PostController.get("/", VerifyToken, async (req, res) => {
    try {
        const posts = Post.find({});
        res.status(200).json(posts);
    } catch (e) {
        res.status(500).json();
    }
});

PostController.get("/:id", VerifyToken, async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);

        res.status(200).json({
            postId: post._id,
            body: post.body,
            title: post.title
        });
    } catch (e) {
        return res.status(500).json({
        });
    }
});

module.exports = PostController;