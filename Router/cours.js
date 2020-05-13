const express = require("express");
const contro = require("../controllers");
const jwt = require("../middleware");

//affection des routers
const cours = express.Router();

//protection des reouters
cours.use(jwt.jws.verifyToken);

cours.post("/cours/add", contro.cours.add);
cours.get("/cours/select", contro.cours.affichage);
cours.post("/cours/update", contro.cours.update);

module.exports = cours;
