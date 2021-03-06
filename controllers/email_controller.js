const express = require("express");
const EmailController = express.Router();
const Organization = require("../models/organization");
const User = require("../models/user");
const { SECRET } = require("../config");
const { sendConfirmationEmail } = require("../services/verify_email");
const { generateToken } = require("../services/authentication");
const jwt = require("jsonwebtoken");
const { CLIENT_URL } = require("../config");

// Verifies organization emails
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
        res.redirect(`${CLIENT_URL}/org/login`);
    } catch (e) {
        res.status(500).json();
    }

});

// Verifies user emails
EmailController.get("/user/:id", async (req, res) => {
    try {
        const token = req.params.id;
        jwt.verify(token, SECRET, async (err, decoded) => {
            if (err) {
                console.log(err);
                return res
                    .status(500)
                    .send({ auth: false, message: "Failed to authenticate token." });
            }

            const user = await User.findById(decoded.id);

            if (!user) {
                return res
                    .status(404)
                    .send({ auth: false, message: "No user found" });
            }

            await user.updateOne({ confirmed: true });
        });
        res.redirect(`${CLIENT_URL}/user/login`);
    } catch (e) {
        res.status(500).json();
    }
});

EmailController.get("/resend/org/:id", async (req, res) => {
    try {

        const orgId = req.params.id;

        const org = await Organization.findById(orgId);

        if (!org) {
            return res.status(404).json({ message: "Organization not found" })
        }
        const token = await generateToken(org._id);
        sendConfirmationEmail(token, org.organizationEmail, "org");
        res.status(200).json();
    } catch (e) {
        console.log(e);
        res.status(500).json();
    }
});

EmailController.get("/resend/user/:id", async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const token = await generateToken(user._id);
        sendConfirmationEmail(token, user.userEmail, "user");
        res.status(200).json();
    } catch (e) {
        res.status(500).json();
    }
});

module.exports = EmailController;