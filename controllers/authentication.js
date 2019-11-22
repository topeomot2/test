const jsonwebtoken = require("jsonwebtoken");
const validator = require("validator");
const User = require("../models/User");
const Env = require("../utils/env.utils");

module.exports = {
  login: async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
    if (!username || !password)
      return res.status(400).json({ message: "Incomplete details sent" });

    if (!validator.isEmail(username)) {
      return res.status(400).json({ message: "Invalid username sent" });
    }

    try {
      //check user from db
      const user = await User.getUserByLoginDetails(username, password);
      const token = jsonwebtoken.sign(
        { id: user.id, email: user.email },
        Env.get("JWT_SECRET")
      );

      return res.status(200).json({ user, token });
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Invalid login details, try again" });
    }
  },
  register: async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Incomplete details sent" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email sent" });
    }

    try {
      let user = await User.create(email, password);
      return res
        .status(200)
        .json({ user, message: "Account successfully created" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  }
};
