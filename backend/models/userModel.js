import { DataTypes } from "sequelize";
import sequelize from "../util/database.js";

function createAutoIncrementGenerator(start = 10001) {
  let index = start;

  return function () {
    return index++;
  };
}

const generateUserId = createAutoIncrementGenerator();

const User = sequelize.define("User", {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: false,
    defaultValue: () => generateUserId(),
    validate: {
      isNumeric: true,
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 50],
      notEmpty: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [8, 64],
      notEmpty: true,
    },
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isIn: [["Admin", "Viewer", "Employee"]],
    },
  },
});

export default User;
