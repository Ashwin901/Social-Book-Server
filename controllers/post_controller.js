const express = require("express");
const PostController = express.Router();
const Post = require("../models/post");
const { VerifyToken } = require("../middleware/verify_token");

PostController.post("/", VerifyToken, async (req, res) => {

    const organizationId = req.body.organizationId;
    const postBody = req.body.postBody;

    Post.create({
        organizationId: organizationId,
        body: postBody,
    }, (e, post) => {
        if (e) {
            return res.status(500).json();
        }

        res.status(200).json({
            postId: post._id,
            body: post.body,
        })
    })
});

PostController.get("/:id", VerifyToken, async (req, res) => {
    try {
        const postId = req.params.id;
        const post = Post.findById(postId);

        res.status(200).json({
            postId: post._id,
            body: post.body,
        });
    } catch (e) {
        return res.status(500).json({
        });
    }
});

module.exports = PostController;