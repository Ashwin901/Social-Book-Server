const express = require("express");
const OrganizationController = express.Router();
const Organization = require("../models/organization");
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


module.exports = OrganizationController;