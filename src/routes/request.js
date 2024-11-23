const express = require("express");
const { userAuth } = require("../middleware/auth");
const requestRouter = express.Router();
const { sendConnectionRequest } = require("../controller/controller");
const {
  userInterested,
  reviewUserStatus,
  removeConnection,
} = require("../controller/requestController");

requestRouter.post("/sendConnectionRequest", userAuth, sendConnectionRequest);
requestRouter.post("/request/send/:status/:toUserId", userAuth, userInterested);
requestRouter.post("/remove/connection/:toUserId", userAuth, removeConnection);
requestRouter.post(
  "/request/review/:status/:toUserId",
  userAuth,
  reviewUserStatus
);

module.exports = requestRouter;
