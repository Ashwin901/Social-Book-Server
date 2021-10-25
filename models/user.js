const mongoose = require("mongoose")

//user schema with name,email and password (for now)

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        required: true
    },
    userContact: {
        type: String,
        required: true
    },
    confirmed: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("User", UserSchema)