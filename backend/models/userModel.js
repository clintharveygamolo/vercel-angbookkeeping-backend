import  { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../util/database.js';

const User = sequelize.define("User", {
    user_id: {
        type: DataTypes.INTEGER, 
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default User;