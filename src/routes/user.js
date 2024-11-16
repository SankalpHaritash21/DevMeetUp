const express = require("express");
const { addUser, loginUser } = require("../controller/authController");
const userRouter = express.Router();

userRouter.post("/signup", addUser);
userRouter.post("/login", loginUser);

module.exports = userRouter;
