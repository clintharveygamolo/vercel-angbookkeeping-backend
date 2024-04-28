import sequelize from '../util/database.js';
import { DataTypes } from 'sequelize';

const Withdraws = sequelize.define("Withdraws", {
    withdraw_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true
    },
    date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    payee: {
        type: DataTypes.STRING,
        allowNull: true
    },
    check_no: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    invoice_no: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    remarks: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

export default Withdraws;