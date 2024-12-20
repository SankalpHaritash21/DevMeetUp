const User = require("../models/user");
const { validateSignupData } = require("../utils/request");
const bcrypt = require("bcrypt");
const validator = require("validator");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const deleteUser = async (req, res, next) => {
  console.log(req.body);
  const id = req.body?._id;
  try {
    const users = await User.findByIdAndDelete({ _id: id });

    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const updateUser = async (req, res, next) => {
  console.log(req.params);
  const id = req.params?.userId;
  const updateData = req.body;

  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "age", "gender", "skills"];
    const isUpdateAllowed = Object.keys(updateData).every((k) => {
      return ALLOWED_UPDATES.includes(k);
    });

    if (updateData?.skills.length > 10)
      throw new Error("Skills should not be more than 10");

    // const isUpdateAllowed = Object.keys(updateData).every((k) => ALLOWED_UPDATES.includes(k));---> This is the shorthand of above code

    if (!isUpdateAllowed) {
      throw new Error("Update Not Allowed");
    }
    const users = await User.findByIdAndUpdate({ _id: id }, updateData, {
      returnDocument: "after",
      runValidators: true,
    });

    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

const updateUserByEmail = async (req, res, next) => {
  console.log(req.body);
  const email = req.body?.emailId;
  const updateData = req.body;

  // Define allowed fields for update
  const ALLOWED_UPDATES = ["age", "gender", "skills", "about", "photoUrl"];

  try {
    // Validate if email is provided and properly formatted
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).send("Invalid or missing email ID");
    }

    // Check that only allowed fields are present in updateData
    const isUpdateAllowed = Object.keys(updateData).every((key) =>
      ALLOWED_UPDATES.includes(key)
    );
    if (!isUpdateAllowed) {
      return res.status(400).send("Update contains invalid fields");
    }

    if (
      updateData.age &&
      (typeof updateData.age !== "number" || updateData.age < 18)
    ) {
      return res
        .status(400)
        .send("Invalid age; must be a number and at least 18");
    }
    if (
      updateData.gender &&
      !["male", "female", "other"].includes(updateData.gender.toLowerCase())
    ) {
      return res.status(400).send("Invalid gender value");
    }
    if (
      updateData.skills &&
      (!Array.isArray(updateData.skills) ||
        new Set(updateData.skills).size !== updateData.skills.length)
    ) {
      return res
        .status(400)
        .send("Skills must be unique and non-empty strings");
    }

    // Proceed to update user
    const updatedUser = await User.findOneAndUpdate(
      { emailId: email },
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedUser) {
      return res.status(404).send("User not found");
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const sendConnectionRequest = async (req, res) => {
  try {
    const user = req?.user;
    console.log("Send Connection Request");
    res.status(200).send(user?.firstName + "Connection Request Sent");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  deleteUser,
  updateUser,

  updateUserByEmail,
  sendConnectionRequest,
};
