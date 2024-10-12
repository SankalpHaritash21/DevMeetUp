console.log("Dev Tinder Backend File");

const express = require("express");
const app = express();

const PORT = 3000;

app.get("/user/:userId/:name/:password", (req, res) => {
  // res.send("Server Running Namaste Node.JS");
  console.log(req.params);
  res.send({
    firstName: "Sankalp",
    lastName: "Haritash",
  });
});

app.listen(PORT, () => {
  console.log(`App is running on PORT ${PORT}`);
});
