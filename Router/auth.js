const express = require("express");
const controller = require("../controllers");

const auth = express.Router();

auth.post("/login", controller.users.login);
auth.post("/signup", controller.users.newuser);

module.exports = auth;
