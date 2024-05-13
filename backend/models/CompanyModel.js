import sequelize from '../util/database.js';
import { DataTypes } from 'sequelize';
import Bank from '../models/BankModel.js';

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

export default Company;