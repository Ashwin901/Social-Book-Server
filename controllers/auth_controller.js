const express = require("express");
const AuthController = express.Router();
const bcrypt = require("bcryptjs");
const { generateToken } = require("../services/authentication");
const Organization = require("../models/organization");
const User = require('../models/user');

AuthController.post("/org/register", (req, res) => {
    const organizationName = req.body.organizationName;
    const organizationEmail = req.body.organizationEmail;
    const password = req.body.password;
    const organizationAddress = req.body.organizationAddress;
    const organizationContact = req.body.organizationContact;


    const hashedPassword = bcrypt.hashSync(password, 8);

    Organization.create(
        {
            organizationName: organizationName,
            organizationEmail: organizationEmail,
            password: hashedPassword,
            organizationAddress: organizationAddress,
            organizationContact: organizationContact
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
                organizationName: organization.organizationName,
                organizationEmail: organization.organizationEmail,
                organizationAddress: organization.organizationAddress,
                organizationContact: organization.organizationContact,
                message: "Registration successful",
            });
        }
    );
});

AuthController.post("/org/login", async (req, res) => {
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
        console.log(organization.name);
        res.status(200).json({
            auth: true,
            token: token,
            organizationId: organization._id,
            organizationName: organization.organizationName,
            organizationEmail: organization.organizationEmail,
            organizationAddress: organization.organizationAddress,
            organizationContact: organization.organizationContact,
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

//user schema : userName, userEmail, password

AuthController.post('/user/register', async (req, res) => {
    const userName = req.body.userName
    const userEmail = req.body.userEmail
    const password = req.body.password

    const hashedPassword = bcrypt.hashSync(password, 8)
    User.create({
        userName: userName,
        userEmail: userEmail,
        password: hashedPassword,
    }, (e, user) => {
        if (e) {
            const message = e.code == 11000 ? "User already registered" : "Try again later"
            return res.status(500).json({
                auth: false,
                message: message
            })
        }
        const token = generateToken(user._id)
        res.status(200).json({
            auth: true,
            token: token,
            userId: user._id,
            userName: user.name,
            userEmail: user.email,
            message: 'Registration success'
        })
    })
})

AuthController.post('/user/login', async (req, res) => {
    const userEmail = req.body.userEmail
    const password = req.body.password
    try {
        const user = await User.findOne({ userEmail: userEmail })
        console.log(user)
        if (!user) {
            console.error('No user found')
            return res.status(404).json({
                auth: false, message: "User not found"
            })
        }
        const checkPassword = bcrypt.compareSync(password, user.password)
        console.log(checkPassword);
        if (!checkPassword) {
            console.error('Invalid password')
            return res.status(401).json({ auth: false, token: null, message: 'Invalid password' })
        }
        const token = generateToken(user._id)
        res.status(200).json({
            auth: true,
            token: token,
            userId: user._id,
            userName: user.name,
            userEmail: user.email,
            message: 'Login successful'
        })
    } catch (e) {
        if (e) {
            console.error('Login error ' + e)
            return res.status(500).json({
                auth: false, token: null, message: 'Login failed. Try again!'
            })
        }
    }
})

module.exports = AuthController;