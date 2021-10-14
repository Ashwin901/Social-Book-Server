const express = require("express");
const OrganizationController = express.Router();
const Organization = require("../models/organization");
const Post = require("../models/post");
const { VerifyToken } = require("../middleware/verify_token");

OrganizationController.get("/",VerifyToken, async (req, res) => {
    try {
        const orgs = await Organization.find({},{password : 0}) //exclude passwords
        res.status(200).json(orgs)
    }
    catch(e){
        res.status(500).json()
    }
})

OrganizationController.get("/:id", VerifyToken, async (req, res) => {
    try {
        const organizationId = req.params.id;
        const organization = await Organization.findById(organizationId);

        res.status(200).json({
            body: organization
        });
    } catch (e) {
        console.log(e);
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

module.exports = OrganizationController;