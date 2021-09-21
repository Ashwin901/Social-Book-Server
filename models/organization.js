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
    }
});

mongoose.model("Organization", OrganizationSchema);
module.exports = mongoose.model("Organization");