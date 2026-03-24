const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); //

const task = sequelize.define("task", {
    taskname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    taskdescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: "task",
    timestamps: true, // Automatically adds createdAt and updatedAt
  });
  
  module.exports = task;