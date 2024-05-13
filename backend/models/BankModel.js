import sequelize from '../util/database.js';
import { DataTypes } from 'sequelize';
import Company from '../models/CompanyModel.js';
import Deposit from '../models/depositsModel.js';
import Withdraw from '../models/withdrawsModel.js';

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