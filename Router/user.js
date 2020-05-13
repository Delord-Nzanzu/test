const express = require("express");
const traitement = require("../controllers");
const jwt = require("../middleware");

const router = express.Router();

// router.use(jwt.jws.verifyToken);

router.get("/user/select", traitement.users.notify);
router.post("/user/select/:name", traitement.users.notify2);
router.post("/user/update", traitement.users.update);

module.exports = router;
