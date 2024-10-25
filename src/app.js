console.log("Dev Tinder Backend File");

const express = require("express");
const app = express();
const PORT = 3000;

app.use(
  "/user",
  (req, res, next) => {
    console.log("Handling the route user!!");
    // res.send("Route Handler 1");
    next();
  },
  (req, res) => {
    console.log("Handling the route user!!");
    res.send("Route Handler 2");
  }
);

app.listen(PORT, () => {
  console.log(`App is running on PORT ${PORT}`);
});
