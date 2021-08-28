const express = require("express");
const cors = require("cors");
const requestLogger = require("./middleware/request_logger");
const { DATABASE_HOST, DATABASE_DB, DATABASE_PASSWORD, DATABASE_USER } = require("./config");
const app = express();

var mysql = require('mysql');

try {
    var connection = mysql.createConnection({
        host: DATABASE_HOST,
        user: DATABASE_USER,
        password: DATABASE_PASSWORD,
        database: DATABASE_DB
    });

    connection.connect();
} catch (e) {
    console.log(e);
}


connection.end();

app.use(express.json());
app.use(requestLogger);
app.use(cors());

app.get("/api", (req, res) => {
    res.send("Hello world!");
});

module.exports = app;