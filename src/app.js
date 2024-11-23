console.log("Dev Tinder Backend File");

const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 8000;
const cookieParser = require("cookie-parser");
const ConnectDB = require("./config/database");
const { setResponseHeaders } = require("./middleware/auth");

const corsOptions = {
  origin: process.env.CORS_ORIGIN || "*",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const getUserRouter = require("./routes/getUser");

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(setResponseHeaders);

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", getUserRouter);

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
