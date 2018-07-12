const express = require("express");
const router = express.Router();
const flairController = require("../controllers/flairController");

router.get("/posts/:postId/flair/new", flairController.new);
router.get("/posts/:postId/flair/:id", flairController.show);
router.post("/posts/:postId/flair/create", flairController.create);


module.exports = router;