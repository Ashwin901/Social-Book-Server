const express = require("express");
const OrganizationController = express.Router();
const Organization = require("../models/organization");
const Post = require("../models/post");
const { VerifyToken } = require("../middleware/verify_token");

OrganizationController.get("/:id", VerifyToken, async (req, res) => {
    try {
        const organizationId = req.params.id;
        const organization = await Organization.findById(organizationId);

        res.status(200).json({
            body: organization
        });
    } catch (e) {
        res.status(500).json();
    }
});

OrganizationController.get("/posts/:id", VerifyToken, async (req, res) => {
    try {
        const organizationId = req.params.id;
        const organizationPosts = await Post.find({ organizationId: organizationId });
        res.status(200).json(organizationPosts);
    } catch (e) {
        res.status(500).json();
    }
});


OrganizationController.get("/name", VerifyToken, async (req, res) => {
    try {
        const organizationNames = await Organization.find({}, { organizationName: 1 });
        res.status(200).json(organizationNames);
    } catch (e) {
        res.status(500).json()
    }
});

module.exports = OrganizationController;