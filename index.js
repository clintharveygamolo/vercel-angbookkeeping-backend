import express from "express";
import mysql from "mysql";

const app = express()
const port = 9000;

const connection = mysql.createConnection({
    host: 'db',
    user: 'test',
    password: 'clintdinstephen',
    database: 'mariadb',
    port: '3306'
});

connection.connect()
connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
    if(err) throw err

    console.log("The solution is: ", rows[0].solution)
});
connection.end()

app.get("/", (req, res) => {
    res.send("Hello, world");
});

app.listen(port, () => {
    console.log(`${port} is running`);
});
