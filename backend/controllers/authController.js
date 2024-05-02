import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export async function login(req, res, next) {
    const MAX_AGE = 60 * 60 * 1000;
    try {
        const { user_id, password } = req.body;

        if (!user_id, !password ) {
            return res.status(401).json({ message: " All fields are required!"});
        }

        const user = await User.findOne({ where: { user_id: user_id } });

        if (!user) {
            return res.status(401).json({ message: "Incorrect User ID or password!"});
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword) {
            return res.status(401).json({ message: "Incorrect User ID or password!"});
        }

        const token = jwt.sign({ userId: user.user_id.toString()}, "secret", { expiresIn: '1hr' });
        res.cookie("token", token, {
            httpOnly: false,
            maxAge: MAX_AGE
        });

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
