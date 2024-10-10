console.log("Dev Tinder Backend File");

const express = require("express");
const app = express();

const PORT = 3000;

app.get("/user", (req, res) => {
  res.send("Server Running Namaste Node.JS");
});

app.post("/user", (req, res) => {
  //Data Successfully Saved
  res.send("Data Saved To database Successfully");
});

app.delete("/user", (req, res) => {
  //Data Successfully Saved
  res.send("User Deleted Successfully");
});

app.listen(PORT, () => {
  console.log(`App is running on PORT ${PORT}`);
});
