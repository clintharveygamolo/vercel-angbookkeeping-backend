import  { DataTypes } from 'sequelize';
import sequelize from '../util/database.js';

function createAutoIncrementGenerator(start = 10001) {
    let index = start;
    
    return function() {
        return index++;
    };
}

const generateUserId = createAutoIncrementGenerator();

const User = sequelize.define("User", {
    user_id: {
        type: DataTypes.INTEGER, 
        primaryKey: true,
        allowNull: false,
        autoIncrement: false,
        defaultValue: () => generateUserId()
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