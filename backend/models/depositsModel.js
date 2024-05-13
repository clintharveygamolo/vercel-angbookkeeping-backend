import sequelize from '../util/database.js';
import { DataTypes } from 'sequelize';
import Bank from '../models/BankModel.js';

const Deposit = sequelize.define("Deposit", {
    deposit_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    }, 
    particular: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
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

export default Deposit;