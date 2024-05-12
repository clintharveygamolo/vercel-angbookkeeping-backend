import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export async function logOut(req, res) {
    try {
        if (req.cookies.accessToken || req.cookies.refreshToken) {
            res.cookie('accessToken', '', {
                maxAge: 1
            });

            res.cookie('refreshToken', '', {
                maxAge: 1
            });
            res.status(200).json({ message: "Logout successfull!"});
        } else {
            res.status(401).json({ message: "No token found!"});
        }
    } catch (err) {
        res.status(401).json({ message: "There was an error logging out!"})
    }
};
