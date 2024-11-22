const multer = require("multer"); // Middleware to handle file uploads
const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const { userUploadImage } = require("../upload/imageUploder.js");
const {
  userProfile,
  userEditProfile,
  userEditPassword,
} = require("../controller/profileController");
const upload = multer({ dest: "profile_images" }); // Store file in memory

profileRouter.get("/profile/view", userAuth, userProfile);
profileRouter.post("/profile/edit", userAuth, userEditProfile);
profileRouter.post("/profile/password", userAuth, userEditPassword);
profileRouter.post(
  "/profile/image",
  userAuth,
  upload.single("file"),
  userUploadImage
);

module.exports = profileRouter;
