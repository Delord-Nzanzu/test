const express = require("express");
const controller = require("../controllers");

const auth = express.Router();

auth.post("/auth/login", controller.users.login);
auth.post("/auth/signup", controller.users.newuser);

module.exports = auth;
