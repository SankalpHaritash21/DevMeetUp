console.log("Dev Tinder Backend File");

const express = require("express");
const app = express();
const cors = require("cors");
const AdminAuth = require("./middleware/middleware");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: "https://example.com",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// Handle Auth Middleware for only Get request

app.use("/admin", AdminAuth);

app.use("/admin/getAllData", (req, res, nest) => {
  //check logic if user is Authorized
  console.log("Admin Data Access");
  res.status(200).send("Admin Data Access Granted");
});
require("../connection/db");

app.listen(PORT, () => {
  console.log(`App is running on PORT ${PORT}`);
});
