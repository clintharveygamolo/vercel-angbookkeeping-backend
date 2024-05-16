import sequelize from '../util/database.js';
import { DataTypes } from 'sequelize';
import Bank from './BankModel.js';
import BankCode from "./bankCodeModel";
import Account from './accountModel.js';

const Company = sequelize.define("Company", {
    company_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    companyName: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Company.hasMany(Account, { foreignKey: 'company_id' });
Company.hasMany(Bank, { foreignKey: 'company_id' });
Company.hasMany(BankCode, { foreignKey: 'company_id' });

export default Company;