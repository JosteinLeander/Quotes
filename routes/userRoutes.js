const express = require("express");
const router = express.Router();
const userControllers = require("../controlllers/userControllers");
const verifiedToken = require("../middleware/auth");

router.get("/", userControllers.index);
router.get("/sign-in", userControllers.login);
router.post("/sign-in", userControllers.loginUser);
router.get("/sign-up", userControllers.signup);
router.post("/sign-up", userControllers.registrerUser);
router.get("/home/user", userControllers.home);
router.post("/add", userControllers.addquote);
router.get("/user", userControllers.otherquote);
router.get("/LoggUt", userControllers.logout);

module.exports = router;