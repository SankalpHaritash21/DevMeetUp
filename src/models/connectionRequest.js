const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const connectionRequestSchema = new Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["interested", "accepted", "rejected", "ignored"],
        message: `{VALUE} is incorrect status type.`,
      },
    },
  },
  { timestamps: true }
);

// ConnectionRequest.find({fromUserId: 273478465864786587, toUserId: 273478465864786587})
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

const ConnectionRequest = model("ConnectionRequest", connectionRequestSchema);

connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("You cannot send connection request to yourself");
  }
  next();
});

module.exports = ConnectionRequest;
