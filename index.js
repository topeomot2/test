const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const express = require("express");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const Env = require("./utils/env.utils");
const authentication = require("./controllers/authentication");
const authMiddleware = require("./middleware/auth");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());

//register endpoint
app.post("/register", authentication.register);

//login endpoint
app.post("/login", authentication.login);

//user authentication middleware
app.use(authMiddleware.checkWithJWT);

//non user are blocked beyond this point
app.use(authMiddleware.disallowNoUser);

app.get("/", (req, res) => res.json({ status: "success" }));

//if endpoint does not exist
app.use((req, res, next) =>
  res.status(404).json({ message: "An error occured" })
);

app.use(express.static(path.join(__dirname, "public")));

app.listen(Env.PORT || 3005);
