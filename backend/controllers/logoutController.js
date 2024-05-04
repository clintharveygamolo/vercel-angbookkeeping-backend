import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export async function logOut(req, res) {
    if (req.cookies.token) {
        res.cookie('token', '', {
            maxAge: 1
        });
        res.status(200).json({ message: "Logout successfull!"});
    } else {
        res.status(401).json({ message: "No token found!"});
    }
};
