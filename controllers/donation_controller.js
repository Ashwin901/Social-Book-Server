const express = require("express")
const { VerifyToken } = require("../middleware/verify_token")
const Donation = require("../models/donation")
const User = require("../models/user")
const DonationController = express.Router()
const { STRIPE_API_KEY } = require("../config")
const stripe = require("stripe")(STRIPE_API_KEY)

//payment endpoint

DonationController.post("/charge", VerifyToken, async (req, res) => {
    console.log("payment route reached", req.body)
    //stripe.charges.create callback here
    try {
        let { status } = await stripe.charges.create({
            amount : req.body.amount*100,
            currency: 'inr',
            source : req.body.token
        })
        return res.status(200).send({status})
    }catch(err){
        //status code 500
        console.log(err)
        return res.status(500).end()
    }
})


DonationController.get("/user/:id", VerifyToken, async (req, res) => {
    //get all donations done by a particular user
    try {
        const userId = req.params.id
        const donations = await Donation.find({ userId: userId })
        res.status(200).json(donations)
    } catch (err) {
        console.log(err)
        res.status(500).json()
    }
})

DonationController.get("/org/:id", VerifyToken, async (req, res) => {
    //get all donations for an organisation
    try {
        const orgId = req.params.id
        const donations = await Donation.find({organizationId: orgId})
        console.log(donations)
        res.status(200).json(donations)
    } catch (err) {
        console.log(err)
        res.status(500).json()
    }
})

DonationController.post("/save", VerifyToken, async (req, res) => {
    try {
        const donation = req.body
        const user = await User.findById(donation.userId , { userName: 1 })
        console.log({...donation,userName : user.userName})
        Donation.create({ ...donation, userName: user.userName },
        (e, donation) => {
            if (e) {
                console.log(e)
                return res.status(500).json()
            }
            return res.status(200).json()
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json()
    }
})

module.exports = DonationController
