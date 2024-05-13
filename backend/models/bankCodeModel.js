import sequelize from '../util/database.js';
import { DataTypes } from 'sequelize';

const BankCode = sequelize.define("Bank", {
    bank_code_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    bank_code: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default BankCode;