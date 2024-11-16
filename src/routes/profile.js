const express = require("express");
const { userAuth } = require("../middleware/auth");
const profileRouter = express.Router();
const {
  userProfile,
  userEditProfile,
  userEditPassword,
} = require("../controller/profileController");

profileRouter.get("/profile/view", userAuth, userProfile);
profileRouter.post("/profile/edit", userAuth, userEditProfile);
profileRouter.post("/profile/password", userAuth, userEditPassword);

module.exports = profileRouter;
