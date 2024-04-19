import express from "express";
import mysql from "mysql";

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

app.get("/", (req, res) => {
    res.send("Hello, world");
});
