import express from "express";
import sequelize from './util/database.js';
import User from './models/userModel.js';
import authRoutes from './routes/authRoute.js'
import createUserRoute from './routes/createUserRoute.js';
import bcrypt from 'bcrypt';
import cors from 'cors';
import createWithdraws from "./routes/createWithdrawsRoute.js";

const app = express();
app.get("/", (req, res) => {
    res.send("Hello, world");
});

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/auth', createUserRoute);
app.use('/api/auth', createWithdraws);

// Routes
const port = 9000;

try {
    await sequelize.sync({ force: true });
    
    const adminPass = await bcrypt.hash("adminpass", 12);
    await User.create({
        name: "Clint",
        password: adminPass,
        role: "Admin"
    });

    app.listen(port);
    console.log("Listening on port ", port);
} catch (error) {
    console.error(error);
}

export default app;