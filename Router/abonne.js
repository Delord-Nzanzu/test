const express = require("express");
const controller = require("../controllers");
const jwt = require("../middleware");

const router = express.Router();

router.use(jwt.jws.verifyToken);

router.post("/abonne/add", controller.abonnes.addnewcours);
module.exports = router;
