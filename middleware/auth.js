const jsonwebtoken = require("jsonwebtoken");
const User = require("../models/User");
const Env = require("../utils/env.utils");

module.exports = {
  //check jwt, verify and attach user to request object
  checkWithJWT: async (req, res, next) => {
    const token = req.headers.authorization
      ? req.headers.authorization.replace("Bearer ", "")
      : "";
    if (!token) return res.status(401).json({ message: "Unauthorized!" });

    try {
      const decoded = jsonwebtoken.verify(token, Env.get("JWT_SECRET"));
      const user = await User.getById(decoded.id);
      req.user = user;
      return next();
    } catch (err) {
      return next();
    }
  },
  //do not allow non user
  disallowNoUser: (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Access error." });
    }
    return next();
  }
};
