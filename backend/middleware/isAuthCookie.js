import jwt from 'jsonwebtoken';

export default function (req, res, next) {
    const token = req.cookies.token;
    try {
        const user = jwt.verify(token, 'secret');
        req.user = user;
        next();
    } catch (err) {
        res.clearCookie("token");
        err.statusCode = 500;
        next(err);
    }
} 