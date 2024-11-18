const express = require("express");
const { userAuth } = require("../middleware/auth");
const requestRouter = express.Router();
const { sendConnectionRequest } = require("../controller/controller");
const { userInterested } = require("../controller/requestController");

requestRouter.post("/sendConnectionRequest", userAuth, sendConnectionRequest);
requestRouter.post("/request/send/:status/:toUserId", userAuth, userInterested);

module.exports = requestRouter;
