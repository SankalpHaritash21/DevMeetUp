const express = require("express");
const { userAuth } = require("../middleware/auth");
const profileRouter = express.Router();
const { userProfile } = require("../controller/controller");

profileRouter.get("/profile", userAuth, userProfile);

module.exports = profileRouter;
