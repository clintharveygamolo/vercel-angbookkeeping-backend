
import express from "express";
import mysql from "mysql";
import { Sequelize } from 'sequelize';

const app = express();
const port = 9000;
app.listen(port, () => {
    console.log(`${port} is running`);
});

const connection = mysql.createConnection({
    host: 'mariadb',
    user: 'admin',
    password: 'secret',
});

connection.connect()
connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
    if(err) throw err

    console.log("The solution is: ", rows[0].solution)
});
connection.end()

const sequelize = new Sequelize(process.env.DATABASE_DB,
    process.env.DATABASE_USER,
    process.ENV.DATABASE_PASSWORD, 
    {
        host: process.env.DATABASE_HOST,
        dialect: 'mariadb'
    }
);

try {
    await sequelize.authenticate();
    console.log("Connection established!");
} catch (error) {
    console.error("Unable to connect to database ", error);
}



app.get("/", (req, res) => {
    res.send("Hello, world");
});
