const express = require("express");
const { VerifyToken } = require("../middleware/verify_token");
const Visit = require("../models/visit");
const Organization = require("../models/organization");
const User = require("../models/user");
const VisitsController = express.Router();

VisitsController.post("/", VerifyToken, async (req, res) => {
    // create new visit
    const visit = req.body;
    const user = await User.findById(visit.userId , { userName: 1 })
    Visit.create(
        {
            ...visit,
            userName: user.userName
        },
        (e, visit) => {
            if (e) {
                console.log(e);
                res.status(500).json();
            }

            res.status(200).json(visit);
        }
    );
});

VisitsController.put("/:id", VerifyToken, async (req, res) => {
    try {
        const updatedVisit = req.body;
        const id = req.params.id;
        const visit = await Visit.findById(id);

        if (!visit) {
            res.status(404).json("Visit not found!! Please try again");
        }

        await visit.updateOne(updatedVisit);
        res.status(200).json(visit);
    } catch (e) {
        res.status(500).json();
    }
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

VisitsController.delete("/:id", VerifyToken, async (req, res) => {
    try {
        const id = req.params.id;
        await Visit.deleteOne({ _id: id });
        res.status(200).json();
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

// to get the name of organizations
VisitsController.get("/name/org", VerifyToken, async (req, res) => {
    try {
        const organizationNames = await Organization.find({}, { organizationName: 1 });
        res.status(200).json(organizationNames);
    } catch (e) {
        res.status(500).json()
    }
});

module.exports = VisitsController;
