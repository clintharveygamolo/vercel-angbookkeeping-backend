import  { DataTypes, Sequelize } from 'sequelize';

const sequelize = new Sequelize(
    'mariadb',
    'admin',
    'password', {
        host: 'mariadb',
        dialect: 'mysql'
    });

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully!');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
})

const User = sequelize.define("user", {
    user_id: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    name: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

sequelize.sync().then(() => {
    console.log('Book table created successfully!');
}).catch((error) => {
    console.error('Unable to create table: ', error);
});