import { DataType } from "sequelize-typescript";
import { sequelize } from "../config/config";

export const User = sequelize.define(
  "User",
  {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataType.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataType.STRING,
      allowNull: false,
    },
    email: {
      type: DataType.STRING,
      allowNull: false,
      unique: true,
    },
    image_name: {
      type: DataType.STRING,
      allowNull: false,
    },
    image_path: {
      type: DataType.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "panel",
    timestamps: true,
    paranoid: true,
  }
);

// `sequelize.define` also returns the model
// console.log(User === sequelize.models.User);
// true

module.exports = { sequelize };
export { sequelize };
