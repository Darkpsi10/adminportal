import { DataType } from "sequelize-typescript";
import { sequelize } from "../config/config";

export const Types = sequelize.define(
  "Types",
  {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataType.STRING,
      unique: true,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "types",
  }
);

module.exports = { sequelize };
export { sequelize };
