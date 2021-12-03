var express = require("express");
var router = express.Router();
const commentController = require('../controllers/commentController')






router.post("/create", commentController.createComment);

router.get("/", commentController.getComments);

router.get("/:id", commentController.getComment);

router.put("/:id", commentController.editComment);

router.delete('/:id', commentController.deleteComment);

module.exports = router;