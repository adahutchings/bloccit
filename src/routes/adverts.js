const express = require("express");
const router = express.Router();
const advertController = require("../controllers/advertController")

router.get("/adverts", advertController.index);
router.get("/adverts/new", advertController.new);
router.get("/adverts/:id", advertController.show);
router.post("/adverts/create", advertController.create);


module.exports = router;