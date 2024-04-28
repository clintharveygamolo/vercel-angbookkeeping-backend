import express from "express";
import sequelize from './util/database.js';
import User from './models/userModel.js';
import authRoutes from './routes/authRoute.js'
import bcrypt from 'bcrypt';
import cors from 'cors';

const app = express();
app.get("/", (req, res) => {
    res.send("Hello, world");
});

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

// Routes
const port = 9000;

try {
    await sequelize.sync({ force: true });
    
    const adminPass = await bcrypt.hash("adminpass", 12);
    await User.create({
        user_id: 56686,
        name: "Clint",
        password: adminPass,
        role: "Admin"
    });

    app.listen(port);
    console.log("Listening on port ", port);
} catch (error) {
    console.error(error);
}