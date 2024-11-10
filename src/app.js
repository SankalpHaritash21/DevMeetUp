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

app.get("/", (req, res) => {
  // try {
  //   res.send("Welcome to Dev Tinder Backend");
  // } catch (error) {
  //   console.error(error);
  // }

  throw new Error("Something went wrong");
  res.send("Welcome to Dev Tinder Backend");
});

app.use("/", (err, req, res, next) => {
  if (err) res.status(500).send("Something went wrong");
});

app.listen(PORT, () => {
  console.log(`App is running on PORT ${PORT}`);
});
