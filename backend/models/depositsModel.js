import sequelize from '../util/database.js';
import { DataTypes } from 'sequelize';

const Deposits = sequelize.define("Deposits", {
    deposit_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
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

export default Deposits;