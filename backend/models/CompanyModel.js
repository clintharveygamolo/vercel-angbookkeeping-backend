import sequelize from '../util/database.js';
import { DataTypes } from 'sequelize';

const Company = sequelize.define("Company", {
    company_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    company: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Company;