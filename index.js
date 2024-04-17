import express from "express";
import mariadb from 'mariadb';
import mysql from "mysql";

const app = express();
const port = 9000;

const pool = mariadb.createPool({
    host: 'db',
    user: 'admin',
    password: 'secretadmin',
    connectionLimit: 5
});

// const connection = mysql.createConnection({
//     host: 'db',
//     user: 'test',
//     password: 'secret',
// });

// connection.connect()
// connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
//     if(err) throw err

//     console.log("The solution is: ", rows[0].solution)
// });
// connection.end()

app.get("/", (req, res) => {
    res.send("Hello, world");
});

app.get('/users', async (req, res) => {
    let conn;

    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT * FROM users');
        res.json(rows);
    } catch(err) {
        console.error(err);
        res.status(500).send('Error retrieving users');
    } finally {
        if (conn) conn.release();
    }
});

app.listen(port, () => {
    console.log(`${port} is running`);
});
