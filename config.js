require("dotenv").config();

const PORT = process.env.PORT;
const DATABASE_HOST = process.env.DATABASE_HOST;
const DATABASE_DB = process.env.DATABASE_DB;
const DATABASE_USER = process.env.DATABASE_USER;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;

module.exports = {
    PORT,
    DATABASE_HOST,
    DATABASE_DB,
    DATABASE_USER,
    DATABASE_PASSWORD
};