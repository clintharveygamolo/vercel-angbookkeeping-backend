import jwt from 'jsonwebtoken';

export default function (req, res, next) {
    let token;
    token = req.cookies.token;
    if (token) {
        try {
            const decoded = jwt.verify(token, 'secret');
            req.user =  decoded;
            next();
        } catch (err) {
            res.clearCookie("token");
            res.status(401).json({ message: "Not authorized, token failed!"});
        }
    }
};