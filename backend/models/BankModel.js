import sequelize from '../util/database.js';
import { DataTypes } from 'sequelize';
import BankCode from './bankCodeModel.js';
import Account from './accountModel.js';

const Bank = sequelize.define("Bank", {
    bank_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    bankName: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Bank.hasMany(BankCode, { foreignKey: 'bank_id' });
Bank.hasMany(Account, { foreignKey: 'bank_id' });

export default Bank;