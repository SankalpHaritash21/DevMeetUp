const express = require("express");
const {
  signupUser,
  loginUser,
  logoutUser,
} = require("../controller/authController");
const userRouter = express.Router();

userRouter.post("/signup", signupUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);

module.exports = userRouter;
