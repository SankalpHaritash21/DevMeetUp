const mongoose = require("mongoose");
require("dotenv").config();

const ConnectDB = async () => {
  await mongoose.connect(`${process.env.MONGODB_URL}`);
};

module.exports = ConnectDB;
