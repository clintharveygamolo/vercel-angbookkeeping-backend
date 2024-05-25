import sequelize from "../util/database.js";
import { DataTypes } from "sequelize";

const Account = sequelize.define("Account", {
  account_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  bank_code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  account_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Account;
