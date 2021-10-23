const express = require("express");
const cors = require("cors");
const requestLogger = require("./middleware/request_logger");
const db = require("./services/database");
const AuthController = require("./controllers/auth_controller");
const PostController = require("./controllers/post_controller");
const OrganizationController = require("./controllers/organization_controller");
const UserController = require("./controllers/user_controller");
const VisitsController = require("./controllers/visits_controller");
const DonationController = require("./controllers/donation_controller");
const verifyEmail = require("./services/verify_email");
const EmailController = require("./controllers/email_controller");

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
app.use("/api/org", OrganizationController);
app.use("/api/user", UserController);
app.use("/api/visit", VisitsController);
app.use("/api/donation",DonationController);
app.use("/api/confirm", EmailController);

module.exports = app;