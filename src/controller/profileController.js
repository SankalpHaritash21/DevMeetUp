// - Get /progile/view
// - Patch /profile/edit
// - Patch /profile/password

const User = require("../models/user");
const bcrypt = require("bcrypt");
const {
  validateEditProfileData,
  validatePassword,
} = require("../utils/request");

const userProfile = async (req, res, next) => {
  try {
    const user = req?.user;
    if (!user) {
      throw new Error("User Not Exist");
    }

    res.send("Logged in User: " + user);
  } catch (error) {
    console.log(error);
    res.status(400).send("Internal Server Error", error.message);
  }
};

const userEditProfile = async (req, res, next) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Fields");
    }

    const loggedInUser = req?.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, your profile updated successfuly`,
      data: loggedInUser,
    });
  } catch (error) {
    res.status(400).send("ERROR : " + err.message);
  }
};

const userEditPassword = async (req, res, next) => {
  try {
    if (!validatePassword(req)) {
      throw new Error("Invalid Password Fields");
    }

    const { userId, currentPassword, newPassword } = req?.user;
    if (!userId || !currentPassword || !newPassword) {
      throw new Error("Invalid Fields");
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User Not Found");
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordValid) {
      throw new Error("Invalid Password");
    }
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedNewPassword;

    await user.save();
    res.status(200).send("Password updated successfully");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
};

module.exports = { userProfile, userEditProfile, userEditPassword };
