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

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

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
