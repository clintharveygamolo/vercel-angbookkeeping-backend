import express from "express";
import sequelize from './util/database.js';
import User from './models/userModel.js';
import authRoutes from './routes/authRoute.js'
import createUserRoute from './routes/createUserRoute.js';
import bcrypt from 'bcrypt';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import logoutRoute from './routes/logoutRoute.js';
import createWithdraws from "./routes/createWithdrawsRoute.js";
import editWithdraws from "./routes/editWithdrawsRoute.js";

const app = express();
app.get("/", (req, res) => {
    res.send("Enter valid gateway");
});

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true

}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/auth', logoutRoute);
// app.use('/api/auth', createUserRoute);
// app.use('/api/auth', createWithdraws);
// app.use('/api/auth', editWithdraws);

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

    const employeePass = await bcrypt.hash("employeepass", 12);
    await User.create({
        name: "Stephen Ang",
        password: employeePass,
        role: "Employee"
    });

    const viewerPass = await bcrypt.hash("viewerpass", 12);
    await User.create({
        name: "Din Shane",
        password: viewerPass,
        role: "Viewer"
    });

    const troyPass = await bcrypt.hash("troypass", 12);
    await User.create({
        name: "Adriane Troy Roa",
        password: troyPass,
        role: "Employee"
    });

    app.listen(port);
    console.log("Listening on port ", port);
} catch (error) {
    console.error(error);
}

export default app;