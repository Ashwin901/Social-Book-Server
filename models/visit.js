const mongoose = require("mongoose")

const VisitSchema = new mongoose.Schema({
    visitDate: {
        type: String,
        required: true
    },
    visitTime: {
        type: String,
        required: true
    },
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
        required: true,
    }
});

mongoose.model("Visit", VisitSchema);
module.exports = mongoose.model("Visit");

