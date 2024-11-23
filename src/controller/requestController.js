const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const { ObjectId } = require("mongoose").Types;

const userInterested = async (req, res) => {
  try {
    const fromUserId = req?.user?._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const fromUser = await User.findById(fromUserId);
    if (!fromUser) {
      return res
        .status(404)
        .json({ message: "Authenticated user does not exist!" });
    }

    const allowedStatus = ["ignored", "interested"];
    if (!allowedStatus.includes(status)) {
      return res
        .status(400)
        .json({ message: "Invalid status type: " + status });
    }

    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    // If there is existing Connection Request between the two users, then return an error
    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });
    if (existingConnectionRequest) {
      return res
        .status(400)
        .send({ message: "Connection Request Already Exists!!" });
    }

    if (fromUserId === toUserId) {
      return res
        .status(400)
        .send({ message: "You cannot send connection request to yourself" });
    }

    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);

    const recentRequests = await ConnectionRequest.find({
      fromUserId,
      createdAt: { $gte: oneDayAgo },
    });

    if (recentRequests.length >= 5) {
      return res.status(429).json({
        message: "Connection request limit reached. Try again later!",
      });
    }

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    const result = await connectionRequest.save();

    res.json({
      message: req.user.firstName + " is " + status + " in " + toUser.firstName,
      result,
    });
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
};

const reviewUserStatus = async (req, res) => {
  try {
    const loggedInUser = req.user;
    const { status, toUserId } = req.params;
    console.log(req.params);

    const allowedStatus = ["accepted", "rejected"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ messaage: "Status not allowed!" });
    }

    const connectionRequest = await ConnectionRequest.findOne({
      _id: `${toUserId}`,
      toUserId: `${loggedInUser._id}`,
      status: "interested",
    });
    if (!connectionRequest) {
      return res.status(404).json({ message: "Connection request not found" });
    }

    connectionRequest.status = status;

    const data = await connectionRequest.save();

    res.status(200).json({ message: "Connection request " + status, data });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

module.exports = {
  userInterested,
  reviewUserStatus,
};
