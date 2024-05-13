import sequelize from '../util/database.js';
import { DataTypes } from 'sequelize';

const Account = sequelize.define("AccountType", {
    acccount_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    account_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

export default AccountType;