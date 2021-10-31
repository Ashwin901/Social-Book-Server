const mongoose = require("mongoose");

const OrganizationSchema = new mongoose.Schema({
    organizationName: {
        type: String,
        required: true
    },
    organizationEmail: {
        type: String,
        required: true,
        index: { unique: true }
    },
    password: {
        type: String,
        required: true
    },
    organizationAddress: {
        type: String,
        required: true
    },
    organizationContact: {
        type: String,
        required: true,
        index: { unique: true }
    },
    confirmed: {
        type: Boolean,
        default: false,
    },
    organizationType: {
        type: String,
    },
    organizationImage: {
        type: String
    }
});

mongoose.model("Organization", OrganizationSchema);
module.exports = mongoose.model("Organization");