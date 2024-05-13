import sequelize from '../util/database.js';
import { DataTypes } from 'sequelize';
import Bank from '../models/BankModel.js';

const Withdraw = sequelize.define("Withdraw", {
    withdraw_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    payee: {
        type: DataTypes.STRING,
        allowNull: false
    },
    check_no: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    invoice_no: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    remarks: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

export default Withdraw;