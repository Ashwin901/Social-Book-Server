const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    organizationName: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        required: true,
        type: String
    }
});

mongoose.model("Post", PostSchema);
module.exports = mongoose.model("Post");