console.log("Dev Tinder Backend File");

const express = require("express");
const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Server Running");
});

app.listen(PORT, () => {
  console.log(`App is running on PORT ${PORT}`);
});
