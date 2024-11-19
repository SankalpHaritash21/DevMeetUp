const express = require("express");
const getUserRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const {
  getUserConnections,
  getConnectedUsers,
  getUserFeed,
} = require("../controller/getController");

// - Get /user/connections
// - Get /user/requests/reject
// - Get /user/feed

getUserRouter.get("/user/requests/received", userAuth, getUserConnections);
getUserRouter.get("/user/connections", userAuth, getConnectedUsers);
getUserRouter.get("/feed", userAuth, getUserFeed);

module.exports = getUserRouter;
