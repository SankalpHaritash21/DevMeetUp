const User = require("../models/user");

const getUserByEmail = async (req, res, next) => {
  const userEmail = req.body?.emailId;
  try {
    const users = await User.findOne({ emailId: userEmail });
    if (!users) res.status(404).send("User Not Found");
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    if (!users) res.status(404).send("User Not Found");
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const addUser = async (req, res, next) => {
  console.log(req.body);
  try {
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
      skills = [],
      about,
      photoUrl,
    } = req.body;

    // Validate `firstName` and `lastName`
    if (!firstName || firstName.length < 3 || firstName.length > 20) {
      return res
        .status(400)
        .send("First name must be between 3 and 20 characters.");
    }
    if (!lastName) {
      return res.status(400).send("Last name is required.");
    }

    // Validate `emailId` format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailId)) {
      return res.status(400).send("Invalid email format.");
    }

    // Validate `password` strength
    if (!password || password.length < 6) {
      return res
        .status(400)
        .send("Password must be at least 6 characters long.");
    }

    // Validate `age`
    if (!Number.isInteger(age) || age < 18) {
      return res
        .status(400)
        .send("Age must be a valid integer and at least 18.");
    }

    // Validate `gender`
    const allowedGenders = ["male", "female", "other"];
    if (!allowedGenders.includes(gender)) {
      return res.status(400).send("Invalid gender type.");
    }

    // Validate `skills` array
    if (
      !Array.isArray(skills) ||
      !skills.every((item) => typeof item === "string")
    ) {
      return res.status(400).send("Skills must be an array of strings.");
    }
    if (new Set(skills).size !== skills.length) {
      return res.status(400).send("Skills array must contain unique values.");
    }

    // const user = new User({
    //   firstName: firstName,
    //   lastName: lastName,
    //   emailId: emailId,
    //   password: password,
    //   age: age,
    //   gender: gender,
    //   skills: skills,
    //   about: about,
    //   photoUrl: photoUrl,
    // });

    const user = new User({
      firstName,
      lastName,
      emailId,
      password,
      age,
      gender,
      skills,
      about,
      photoUrl,
    });
    await user.save();
    res.status(201).send("User added successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

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

module.exports = {
  addUser,
  getUserByEmail,
  getAllUser,
  deleteUser,
  updateUser,
  updateUserByEmail,
};
