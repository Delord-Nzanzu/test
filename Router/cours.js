const express = require("express");
const contro = require("../controllers");
const midolware = require("../middleware");

//affection des routers
const cours = express.Router();

//protection des reouters
cours.use(midolware.jwt.verifyToken);

cours.post("/add", contro.cours.add);
cours.get("/", contro.cours.affichage);
cours.put("/update", contro.cours.update);
cours.get("/search", contro.cours.serch);

module.exports = cours;
