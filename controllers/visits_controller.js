const express = require("express");
const { VerifyToken } = require("../middleware/verify_token");
const Visit = require("../models/visit");
const VisitsController = express.Router();

VisitsController.post("/", VerifyToken, (req, res) => {
    // create new visit
});

VisitsController.get("/:id", VerifyToken, (req, res) => {
    // get details of a particular visit
});

VisitsController.get("/user/:id", VerifyToken, (req, res) => {
    // get all visits of a particular user
});

module.exports = VisitsController;