import sequelize from '../util/database.js';
import { DataTypes } from 'sequelize';

const AccountType = sequelize.define("Account Type", {
    acccount_type_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    account_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
});
export default AccountType;