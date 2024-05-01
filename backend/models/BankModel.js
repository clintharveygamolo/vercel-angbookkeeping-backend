import sequelize from '../util/database.js';
import { DataTypes } from 'sequelize';

const Bank = sequelize.define("Bank", {
    bank_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    bankname: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Bank;