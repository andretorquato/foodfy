const { Pool } = require("pg");

module.exports = new Pool({
    user: "postgres",
    password:"andre",
    host: "localhost",
    port:5432,
    database:"foodfy",
});