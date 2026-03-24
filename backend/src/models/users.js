const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Your updated DB config

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
  },
}, {
  tableName: "users",
  timestamps: true, // Automatically adds createdAt and updatedAt
});

module.exports = User;