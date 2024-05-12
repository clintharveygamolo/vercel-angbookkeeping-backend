import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

dotenv.config();
export async function login(req, res) {
    const MAX_AGE = 60 * 60 * 1000;
    try {
        const { user_id, password } = req.body;

        if (!user_id, !password ) {
            return res.status(401).json({ message: " All fields are required!"});
        }
        
        if (!/^\d+$/.test(user_id)) {
            return res.status(401).json({ message: "User ID must contain only numbers." });
        }

        const user = await User.findOne({ where: { user_id: user_id } });
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!user || !isValidPassword) {
            return res.status(401).json({ message: "Incorrect User ID or password!"});
        }

        const accessToken = jwt.sign({ user_id: user_id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
        const refreshToken = jwt.sign({ user_id: user_id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1hr" });

        res.status(200).json({ 
            message: "Authentication successfull", 
            accessToken: accessToken, 
            refreshToken: refreshToken,
            user_id: user_id,
            name: user.name,
            role: user.role,
            login: true
        });
    } catch (error) {
        return res.status(401).json({ login: false, message: "There was an error logging in the user!"});
    }
};
