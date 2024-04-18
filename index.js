import express from "express";
import mysql from "mysql";

const app = express();
const port = 9000;

// const pool = mariadb.createPool({
//     host: 'db',
//     user: 'admin',
//     password: 'secret'
// });
// pool.getConnection()
//     .then(conn => {
//         conn.query("SELECT 1 as val") 
//             .then((rows) => {
//                 console.log(rows);
//                 return conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
//             })
//             .then((res) =>{
//                 console.log(res);
//                 conn.end
//             })
//             .catch(err => {
//                 console.log(err);
//                 conn.end();
//             })
//         }).catch(err => {
//         });

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

// app.get('/users', async (req, res) => {
//     let conn;

//     try {
//         conn = await pool.getConnection();
//         const rows = await conn.query('SELECT 1 + 1 AS solution');
//         res.json(rows);
//     } catch(err) {
//         console.error(err);
//         res.status(500).send('Error retrieving users');
//     } finally {
//         if (conn) conn.release();
//     }
// });

