const bcrypt = require("bcrypt");
const { User, sequelize } = require("../models/sql");

module.exports = {
  getById: async id => {
    let user = await User.findByPk(id);
    if (user === null) throw new Error("Incorrect id");
    user = user.dataValues;
    delete user.pword;
    return user;
  },
  create: async (email, password) => {
    if (!email || !password) throw new Error("Incomplete information");

    const where = { email };

    where.pword = await bcrypt.hash(password, 5);

    return sequelize.transaction(async function(t) {
      try {
        let [data, created] = await User.findOrCreate({
          where,
          transaction: t
        });
        if (!created) {
          throw new Error("email already exist");
        }
        data = data.dataValues;
        delete data.pword;
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    });
  },
  getUserByLoginDetails: async (email, password) => {
    if (!email || !password) throw new Error("Incomplete information");
    let user = await User.findOne({
      where: { email }
    });
    if (user === null) throw new Error("Incorrect username");

    const match = await bcrypt.compare(password, user.pword);
    if (!match) throw new Error("Incorrect password");
    user = user.dataValues;
    delete user.pword;
    return user;
  }
};
