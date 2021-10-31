const nodemailer = require("nodemailer");
const { USER_EMAIL, USER_PASSWORD } = require("../config");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: USER_EMAIL,
        pass: USER_PASSWORD
    }
});

const sendConfirmationEmail = (token, email, type) => {

    const url = `http://social-book-server.herokuapp.com/api/confirm/${type}/${token}`;

    const message = {
        from: "SOCIAL BOOK",
        to: email,
        subject: "Confirmation Email",
        text: "Please use this link to verify your email",
        html: `Click on this link to verify your email <br/> <a href=${url}>${url}</a>`
    };

    transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log(err);
            return;
        }

        console.log(info.response);
    });
}

module.exports = { sendConfirmationEmail };