const { DataTypes } = require("sequelize");
const { sequelize } = require("./db");
const Task = require("./task.model");

const Result = sequelize.define("result", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fileId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  taskId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  result: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
// Define associations
Result.belongsTo(Task, { foreignKey: "taskId" });
sequelize
  .sync()
  .then(() => {
    console.log("result table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });

module.exports = Result;
