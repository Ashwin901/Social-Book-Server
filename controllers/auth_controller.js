const express = require("express");
const AuthController = express.Router();
const bcrypt = require("bcryptjs");
const { generateToken } = require("../services/authentication");
const Organization = require("../models/organization");
const { VerifyToken } = require("../middleware/verify_token");

AuthController.post("/register", (req, res) => {

    try {
        const organizationName = req.body.organizationName;
        const organizationEmail = req.body.organizationEmail;
        const password = req.body.password;

        const hashedPassword = bcrypt.hashSync(password, 8);

        Organization.create(
            {
                organizationName: organizationName,
                organizationEmail: organizationEmail,
                password: hashedPassword
            },
            (err, organization) => {
                if (err) {
                    const message =
                        err.code === 11000
                            ? "Email already in use"
                            : "Some error occurred. Please try again";
                    return res.status(500).json({
                        auth: false,
                        message: message,
                    });
                }

                const token = generateToken(organization._id);
                res.status(200).json({
                    auth: true,
                    token: token,
                    organizationId: organization._id,
                    organizationName: organization.name,
                    organizationEmail: organization.email,
                    message: "Registration successful",
                });
            }
        );
    } catch (e) {
        res.status(500).json({ auth: false, message: "Could not register organization. Please try again" });
    }
});

AuthController.post("/login", async (req, res) => {
    const organizationEmail = req.body.organizationEmail;
    const password = req.body.password;

    try {
        const organization = await Organization.findOne({ organizationEmail: organizationEmail });

        if (!organization) {
            console.log("No organization found for email");
            return res.status(404).json({ auth: false, message: "No user found" });
        }

        const checkPassword = bcrypt.compareSync(password, organization.password);
        if (!checkPassword) {
            console.log("Invalid password");
            return res
                .status(401)
                .json({ auth: false, token: null, message: "Invalid password" });
        }

        const token = generateToken(organization._id);
        res.status(200).json({
            auth: true,
            token: token,
            organizationId: organization._id,
            organizationName: organization.name,
            organizationEmail: organization.email,
            message: "Login successful",
        });

    } catch (e) {
        if (e) {
            console.log("Error while logging in user");
            console.log(e);
            return res.status(500).json({
                auth: false,
                message: "Some error occurred. Please try again",
            });
        }
    }
});


module.exports = AuthController;