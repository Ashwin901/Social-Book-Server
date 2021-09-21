const jwt = require("jsonwebtoken");
const { SECRET } = require("../config");

const generateToken = (id) => {
    const token = jwt.sign({ id: id }, SECRET, {
        expiresIn: "10h"
    });

    return token;
}

module.exports = { generateToken };