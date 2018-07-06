const express = require("express");
const router = express.Router();

const topicController = require("../controllers/advertController")

router.get("/adverts", advertController.index);

module.exports = router;