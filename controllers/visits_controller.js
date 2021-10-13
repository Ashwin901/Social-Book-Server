const express = require("express");
const { VerifyToken } = require("../middleware/verify_token");
const Visit = require("../models/visit");
const VisitsController = express.Router();

VisitsController.post("/", VerifyToken, async (req, res) => {
    // create new visit
    const visit = req.body;

    Visit.create(
        {
            visitDate: visit.date,
            visitTime: visit.time,
            organizationName: visit.orgName,
            organizationId: visit.orgId,
            userId: visit.userId,
        },
        (e, visit) => {
            if (e) {
                res.status(500).json();
            }

            res.status(200).json(visit);
        }
    );
});

VisitsController.get("/:id", VerifyToken, async (req, res) => {
    // get details of a particular visit
    try {
        const id = req.params.id;
        const visit = await Visit.findById(id);
        res.status(200).json(visit);
    } catch (e) {
        res.status(500).json();
    }
});

VisitsController.get("/user/:id", VerifyToken, async (req, res) => {
    // get all visits of a particular user
    try {
        const userId = req.params.id;
        const visits = await Visit.find({ userId: userId });
        res.status(200).json(visits);
    } catch (e) {
        res.status(500).json();
    }
});

VisitsController.get("/org/:id", VerifyToken, async (req, res) => {
    // get all org visits
    try {
        const orgId = req.params.id;
        const visits = await Visit.find({ organizationId: orgId });
        res.status(200).json(visits);
    } catch (e) {
        res.status(500).json();
    }
});

module.exports = VisitsController;
