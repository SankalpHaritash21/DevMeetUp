const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    // Read Cookies form req cookies
    const cookie = req.cookies;
    const { token } = cookie;
    if (!token) {
      throw new Error("Token is not valid!");
    }

    //validating the cookies
    const decodedObj = await jwt.verify(token, process.env.JWT_SECRET);

    // Find the user
    const { _id } = decodedObj;
    const user = await User.findOne({ _id });

    if (!user) {
      throw new Error("Unauthorized Access");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = { userAuth };
