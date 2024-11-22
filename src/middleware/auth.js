const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    // Read Cookies form req cookies
    const cookie = req.cookies;
    const { token } = cookie;
    if (!token) {
      return res.status(401).send("Please Login");
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

// middleware/setHeaders.js
const setResponseHeaders = (req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'");
  res.setHeader(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains"
  );
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "no-referrer");

  req.headers["x-forwarded-for"] = "hidden";
  res.removeHeader("X-Powered-By");
  next();
};

module.exports = { userAuth, setResponseHeaders };
