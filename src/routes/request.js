const express = require("express");
const { userAuth } = require("../middleware/auth");
const requestRouter = express.Router();
const { sendConnectionRequest } = require("../controller/controller");

requestRouter.post("/sendConnectionRequest", userAuth, sendConnectionRequest);

module.exports = requestRouter;
