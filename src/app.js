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
const {
  addUser,
  getUser,
  getAllUser,
  deleteUser,
  updateUser,
} = require("./controller/controller");
app.use(cors(corsOptions));
app.use(express.json());

app.post("/signup", addUser);
app.get("/getuser", getUser);
app.get("/getAllUser", getAllUser);
app.get("/deleteUser", deleteUser);
app.patch("/updateUser", updateUser);

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
