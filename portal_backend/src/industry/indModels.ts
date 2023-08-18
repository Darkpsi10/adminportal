import { DataType } from "sequelize-typescript";
import { sequelize } from "../config/config";

export const Ind = sequelize.define(
  "Ind",
  {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstname: {
      type: DataType.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataType.STRING,
      allowNull: false,
    },
    ind_name: {
      type: DataType.STRING,
      allowNull: false,
      unique: true,
    },
    ind_type: {
      type: DataType.STRING,
      allowNull: false,
    },
    address: {
      type: DataType.STRING,
      allowNull: false,
    },
    address2: {
      type: DataType.STRING,
      allowNull: false,
    },
    email: {
      type: DataType.STRING,
      allowNull: false,
      unique: true,
    },
    email2: {
      type: DataType.STRING,
      allowNull: true,
      unique: true,
    },
    phone: {
      type: DataType.NUMBER,
      allowNull: false,
      unique: true,
    },
    phone2: {
      type: DataType.NUMBER,
      allowNull: true,
      unique: false,
    },
    DOB: {
      type: DataType.DATEONLY,
      allowNull: false,
    },
    status: {
      type: DataType.BOOLEAN,
      allowNull: false,
    },
    salary: {
      type: DataType.DECIMAL,
      allowNull: true,
    },
  },
  {
    tableName: "industry",
    timestamps: false,
  }
);

// `sequelize.define` also returns the model
// console.log(User === sequelize.models.User);
// true

module.exports = { sequelize };
export { sequelize };
