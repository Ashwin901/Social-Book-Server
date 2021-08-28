const express = require("express");
const cors = require("cors");
const requestLogger = require("./middleware/request_logger");
const app = express();

app.use(express.json());
app.use(requestLogger);
app.use(cors());

app.get("/api", (req, res) => {
    res.send("Hello world!");
});

module.exports = app;