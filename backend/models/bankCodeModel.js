import sequelize from '../util/database.js';
import { DataTypes } from 'sequelize';

const BankCode = sequelize.define("Bank Code", {
    bank_code_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    bank_code: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default BankCode;