console.log("Dev Tinder Backend File");

require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT;
const corsOptions = {
  origin: "https://example.com",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
const ConnectDB = require("./config/database");
const User = require("./models/user");
app.use(cors(corsOptions));

app.post("/signup", async (req, res, next) => {
  try {
    const user = new User({
      firstName: "Sam",
      lastName: "1",
      emailId: "Sam@gmail.com",
      password: "Sam@1234",
      age: 21,
      gender: "male",
    });
    await user.save();
    res.status(201).send("user added Successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

ConnectDB()
  .then(() => {
    console.log("Database Connection Successfully");
    app.listen(PORT, () => {
      console.log(`App is running on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error in Connecting Database", err);
  });
