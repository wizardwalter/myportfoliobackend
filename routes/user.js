var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");
const cloud = require("../config/cloudinary_config")


router.post("/create", cloud.single("photo"), userController.createUser);

router.post("/login", userController.loginUser);


module.exports = router;