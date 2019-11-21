const jsonwebtoken = require("jsonwebtoken");

const key = "wwerewrerer";
const id = "12";

module.exports = {
  login: function(username, password) {
    try {
      const token = jsonwebtoken.sign({ id, username }, "wwerewrerer");
      return token;
    } catch (error) {
      throw new Error("signing failed");
    }
  },
  verify: function(token) {
    jsonwebtoken.verify(token, key, function(err, decoded) {
      if (err) {
        throw new Error(err.message);
      }

      if (decoded.id !== id) {
        throw new Error("not a user");
      }

      return true;
    });
  }
};
