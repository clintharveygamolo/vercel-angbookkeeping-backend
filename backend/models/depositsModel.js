import sequelize from '../util/database.js';
import { DataTypes } from 'sequelize';

const Deposits = sequelize.define("Withdraws", {
    deposit_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true
    }, 
    particular: {
        type: DataTypes.STRING,
        allowNull: true
    },
    date: {
        type: DataTypes.DATE,
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

export default Deposits;