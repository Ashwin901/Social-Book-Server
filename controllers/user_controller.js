const express = require("express");
const UserController = express.Router();
const User = require("../models/user");
const { VerifyToken } = require("../middleware/verify_token");

UserController.get("/:id", VerifyToken, async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        res.status(200).json({
            body: user
        });
    } catch (e) {
        res.status(500).json();
    }
});

module.exports = UserController;