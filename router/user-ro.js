const express = require("express");
const router = express.Router();
const controllerUser = require("../controller/user-co.js");

router.post("/signup", controllerUser.signUp);
router.post("/login", controllerUser.login);

module.exports = router;
