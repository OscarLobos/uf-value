const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../db-connection/sequelize.database");
const UFValues = sequelize.define(
  "UFValues",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    originAmount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    conversionDate: {
      type: DataTypes.DATEONLY,
    },
    clpValue: {
      type: DataTypes.FLOAT,
    },
    conversionAmount: {
      type: DataTypes.FLOAT,
    },
  },
  {
    tableName: "uf_values",
    timestamps: true,
  }
);

module.exports = UFValues;
