import sequelize from '../util/database.js';
import { DataTypes } from 'sequelize';

const AccountNumber = sequelize.define("Account Number", {
    acccount_number: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    }
});

export default AccountNumber;