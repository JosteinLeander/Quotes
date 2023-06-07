const express = require("express");
const router = express.Router();
const userControllers = require("../controlllers/userControllers");
const verifiedToken = require("../middleware/auth");

router.get("/", userControllers.index);
router.get("/sign-in", userControllers.login);
router.post("/sign-in", userControllers.loginUser);
router.get("/sign-up", userControllers.signup);
router.post("/sign-up", userControllers.registrerUser);
router.get("/home/:user", userControllers.homeUser);
router.post("/add", userControllers.addquote);
router.post("/edit/:user", userControllers.editquote);
router.get("/LoggUt", userControllers.logout);
router.get("/:user", userControllers.otherquote);
router.get("/usermanual", userControllers.usermanual);

module.exports = router;