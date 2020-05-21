const express = require("express");
const controller = require("../controllers");
const midolware = require("../middleware");

const router = express.Router();

router.use(midolware.jwt.verifyToken);

router.get("/", controller.users.users);
//router.post("/", controller.users.notify2);
router.put("/", controller.users.update);

module.exports = router;
