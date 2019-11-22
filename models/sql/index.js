const Sequelize = require("sequelize");
const UserModel = require("./User");

const {
  SQL_DB_NAME,
  SQL_DB_HOST,
  SQL_DB_USER,
  SQL_DB_PASS
} = require("../../utils/env.utils");

const Op = Sequelize.Op;
const operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $gte: Op.gte,
  $gt: Op.gt,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and,
  $or: Op.or,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col
};

const sequelize = new Sequelize({
  host: SQL_DB_HOST,
  database: SQL_DB_NAME,
  dialect: "mysql",
  username: SQL_DB_USER,
  password: SQL_DB_PASS,
  operatorsAliases: operatorsAliases,
  logging: false
});

sequelize
  .authenticate()
  .then(result => {
    console.log(`Database & tables created!`);
  })
  .catch(err => {
    console.log(err);
  });

const User = UserModel(sequelize);
module.exports = {
  sequelize,
  User
};
