const express = require("express");
const EmailController = express.Router();
const Organization = require("../models/organization");
const User = require("../models/user");
const { SECRET } = require("../config");
const jwt = require("jsonwebtoken");

EmailController.get("/org/:id", async (req, res) => {
    try {
        const token = req.params.id;
        jwt.verify(token, SECRET, async (err, decoded) => {
            if (err) {
                console.log(err);
                return res
                    .status(500)
                    .send({ auth: false, message: "Failed to authenticate token." });
            }

            const org = await Organization.findById(decoded.id);

            if (!org) {
                return res
                    .status(404)
                    .send({ auth: false, message: "No organization found" });
            }

            await org.updateOne({ confirmed: true });
        });
        res.redirect("http://localhost:3000/org/login");
    } catch (e) {
        res.status(500).json();
    }

});

module.exports = EmailController;