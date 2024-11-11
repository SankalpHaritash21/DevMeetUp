const User = require("../models/user");

const getUser = async (req, res, next) => {
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
    const users = await User.find();
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

    const user = new User({
      firstName: req.body?.firstName,
      lastName: req.body?.lastName,
      emailId: req.body?.emailId,
      password: req.body?.password,
      age: req.body?.age,
      gender: req.body?.gender,
    });

    await user.save();
    res.status(201).send("User added successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { addUser };

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
  console.log(req.body);
  const id = req.body?._id;
  const updateData = req.body;
  try {
    const users = await User.findByIdAndUpdate({ _id: id }, updateData, {
      returnDocument: "after",
      runValidators: true,
    });

    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const updateUserByEmail = async (req, res, next) => {
  console.log(req.body);
  const email = req.body?.emailId;
  const updateData = req.body;
  try {
    const users = await User.findByIdAndUpdate({ emailId: email }, updateData);

    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  addUser,
  getUser,
  getAllUser,
  deleteUser,
  updateUser,
};
