import sequelize from "../util/database.js";
import { DataTypes } from 'sequelize';

const Account = sequelize.define("Account", {
    bankCode: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    account_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

export default Account;