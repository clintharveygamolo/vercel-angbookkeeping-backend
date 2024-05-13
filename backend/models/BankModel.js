import sequelize from '../util/database.js';
import { DataTypes } from 'sequelize';

const Bank = sequelize.define("Bank", {
    bank_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    bank_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

export default Bank;