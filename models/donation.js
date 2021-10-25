const mongoose = require("mongoose")


const DonationSchema = new mongoose.Schema({
    organizationName: {
        type: String,
        required: true
    },
    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    donationAmount: {
        type: Number,
        required: true
    },
    dateAdded: {
        type: Date,
        default : Date.now()
    }
})

mongoose.model("Donation", DonationSchema)
module.exports = mongoose.model("Donation")