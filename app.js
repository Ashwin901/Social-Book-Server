const express = require("express");
const cors = require("cors");
const requestLogger = require("./middleware/request_logger");
const db = require("./services/database");
const AuthController = require("./controllers/auth_controller");
const PostController = require("./controllers/post_controller");

const app = express();


app.use(express.json());
app.use(requestLogger);
app.use(cors());
app.use(express.urlencoded({
    extended: true
}))

app.get("/api", (req, res) => {
    res.send("Hello world!");
});

app.use("/api/auth", AuthController);
app.use("/api/post", PostController);

module.exports = app;