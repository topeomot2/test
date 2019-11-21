const express = require("express");
const cookieParser = require("cookie-parser");
const authentication = require("./authentication");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.post("/login", function(req, res) {
  try {
    const { username, password } = req.body;
    let token = authentication.login(username, password);
    res.json({ status: "success", token });
  } catch (error) {
    res.status(400).send({ message: "login failed" });
  }
});

app.get("/verify", function(req, res) {
  try {
    const token = req.headers.authorization
      ? req.headers.authorization.replace("Bearer ", "")
      : "";

    if (!token) return res.status(401).json({ message: "Unauthorized!" });
    authentication.verify(token);
    res.status(201).send({ status: "success" });
  } catch (error) {
    res.status(401).send();
  }
});

app.listen("3005");
