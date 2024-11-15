console.log("Dev Tinder Backend File");

require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT;
const cookieParser = require("cookie-parser");
const ConnectDB = require("./config/database");
const { userAuth } = require("./middleware/auth");

const corsOptions = {
  origin: "https://example.com",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

const {
  addUser,
  loginUser,
  getAllUser,
  deleteUser,
  updateUser,
  userProfile,
  getUserByEmail,
  updateUserByEmail,
  sendConnectionRequest,
} = require("./controller/controller");

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.post("/signup", addUser);
app.post("/login", loginUser);
app.get("/getAllUser", getAllUser);
app.get("/deleteUser", deleteUser);
app.get("/getuser", getUserByEmail);
app.get("/profile", userAuth, userProfile);
app.patch("/updateUser/:userId", updateUser);
app.patch("/updateUserByEmail", updateUserByEmail);
app.post("/sendConnectionRequest", userAuth, sendConnectionRequest);

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
