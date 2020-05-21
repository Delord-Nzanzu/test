const express = require("express");
const controller = require("../controllers");
const midolware = require("../middleware");

const router = express.Router();

router.use(midolware.jwt.verifyToken);

router.post("/add", controller.abonnes.add);
router.get("/", controller.abonnes.subscriptions);
module.exports = router;
