const User = require("../models/user");

const addUser = async (req, res, next) => {
  console.log(req.body);
  try {
    const user = new User({
      firstName: req.body?.firstName,
      lastName: req.body?.lastName,
      emailId: req.body?.emailId,
      password: req.body?.password,
      age: req.body?.age,
      gender: req.body?.gender,
    });
    await user.save();
    res.status(201).send("user added Successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  addUser,
};
