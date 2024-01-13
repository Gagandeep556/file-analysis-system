const { DataTypes } = require("sequelize");
const { sequelize } = require("./db");

const FileInfo = sequelize.define("fileInfo", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fileName: {
    type: DataTypes.STRING,
  },
});
sequelize
  .sync()
  .then(() => {
    console.log("fileInfo table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });

module.exports = FileInfo;
