const User = require("../models/user");
const bcrypt = require("bcrypt");
const { validateSignupData } = require("../utils/request");
const validator = require("validator");

const loginUser = async (req, res, next) => {
  try {
    console.log(req.body);
    const { emailId, password } = req.body;

    // Validate `emailId` format
    if (!validator.isEmail(emailId)) {
      throw new Error("Invalid email format.");
    }
    const user = await User.findOne({ emailId });
    console.log(user);
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const token = await user.getJwt();
    console.log(token);
    const isPasswordCorrect = await user.validatePassword(password);
    if (!isPasswordCorrect) {
      throw new Error("Invalid Credentials");
    } else {
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });

      res.status(200).send(user);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Error:" + err.message);
  }
};

const signupUser = async (req, res, next) => {
  console.log(req.body);
  try {
    validateSignupData(req);

    // check user already exists
    const existingUser = await User.findOne({ emailId: req.body?.emailId });
    if (existingUser) {
      return res.status(400).send("User Already Exists");
    }

    const {
      firstName,
      lastName,
      emailId,
      password,
      age,
      gender,
      skills,
      about,
      photoUrl,
    } = req.body;

    //create Password Hash

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      age,
      gender,
      skills,
      about,
      photoUrl,
    });
    const data = await user.save();
    res.status(201).send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error:" + err.message);
  }
};

const logoutUser = async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });

  res.send("Logged out successfully");
};

module.exports = { signupUser, loginUser, logoutUser };
