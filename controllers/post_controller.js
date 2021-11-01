const express = require("express");
const PostController = express.Router();
const Post = require("../models/post");
const { VerifyToken } = require("../middleware/verify_token");

PostController.post("/",VerifyToken, async (req, res) => {
    
    const organizationId = req.body.organizationId;
    const organizationName = req.body.organizationName;
    const postDate = req.body.postDate;
    const postBody = req.body.postBody;
    const postTitle = req.body.postTitle;

    Post.create({
        organizationId: organizationId,
        body: JSON.stringify(postBody),
        title: postTitle,
        organizationName: organizationName,
        date: postDate
    }, (e, post) => {
        if (e) {
            console.log(e)
            return res.status(500).json();
        }
        res.status(200).json({
            postId: post._id,
        })
    })
});

PostController.get("/",VerifyToken, async (req, res) => {
    try {
        const posts = await Post.find({});
        res.status(200).json(posts);
    } catch (e) {
        console.log(e);
        res.status(500).json();
    }
});

PostController.get("/:id", VerifyToken, async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);
        res.status(200).json(post);
    } catch (e) {
        return res.status(500).json({
        });
    }
});

module.exports = PostController;