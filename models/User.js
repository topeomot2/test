const { DataTypes } = require("sequelize");
const { getCurrentTimeFormat } = require("../../utils/general.utils");

function getCurrentTimeFormat() {
  return moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
}

module.exports = function(sequelize) {
  return sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      email: {
        type: DataTypes.STRING
      },
      pword: {
        type: DataTypes.STRING
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: getCurrentTimeFormat()
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: getCurrentTimeFormat()
      }
    },
    {
      tableName: "users",
      indexes: [
        {
          unique: true,
          fields: ["email"]
        }
      ],
      updatedAt: "updated_at",
      createdAt: "created_at"
    }
  );
};
