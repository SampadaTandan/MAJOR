const express = require("express");
const router = express.Router();
const cards = require("../controllers/card-controller");

router.route("/card").get(cards);
module.exports = router;
