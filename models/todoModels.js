const { DataTypes } = require("sequelize");
const { createDB } = require("../config/db");

const Todo = createDB.define(
  "todos",
  {
    id: {
      primaryKey: true,
      allowNull: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    completed: DataTypes.BOOLEAN,
    priority: DataTypes.NUMBER,
    dueDate: DataTypes.STRING,
  },
  {
    timestamps: false,
  }
);

module.exports = Todo;