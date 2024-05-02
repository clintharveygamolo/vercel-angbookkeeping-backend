import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export async function login(req, res, next) {
    const { user_id, password } = req.body;

    try {
        const user = await User.findOne({ where: { user_id: user_id } });

        if (!user) {
            return res.status(401).json({ message: "Authentication failed, user not found."});
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword) {
            return res.status(401).json({ message: "Authentication failed, wrong password."});
        }

        const token = jwt.sign({ userId: user.user_id.toString()}, "secret", { expiresIn: "1h" });

        res.status(200).json({ 
            message: "Authentication successfull", 
            token: token, 
            userId: user.user_id.toString(),
        });
        next();
    } catch (error) {
        next(error);
    }
};