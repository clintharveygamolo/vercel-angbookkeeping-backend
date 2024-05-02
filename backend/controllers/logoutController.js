import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export async function logOut(req, res) {
    res.clearCookie('token');
    res.status(200).json({ message: "Logout successfull!"});
};
