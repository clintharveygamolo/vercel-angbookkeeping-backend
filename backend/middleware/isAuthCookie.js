import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

const verifyToken = async (req, res, next) => {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
        try {
            await renewToken(req, res, next);
            next();
        } catch (err) {
            return res.status(401).json({ access: false, message: "Invalid token!"});
        }
    } else {
        jwt.verify(accessToken, accessTokenSecret, (err, decoded) => {
            if (err) {
                return res.status(401).json({ access: false, message: "Invalid token!" });
            } else {
                req.user_id = decoded.user_id;
                next();
            }
        });
    }
};

const renewToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        throw new Error('No refresh token');
    }

    try {
        const decoded = jwt.verify(refreshToken, refreshTokenSecret);
        const newAccessToken = jwt.sign({ user_id: decoded.user_id, }, accessTokenSecret, {expiresIn: "1m"});
        res.cookie("accessToken", newAccessToken, {maxAge: 60000});
    } catch (err) {
        throw new Error('Invalid refresh token!');
    }
};

export default verifyToken;


// export default async function (req, res, next) {
//     const accessToken = req.cookies.accessToken;
//     if (!accessToken) {
//         if(renewToken(req, res)) {
//             next();
//         }
//     } else {
//         jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//             if (err) {
//                 console.log(process.env.ACCESS_TOKEN_SECRET)
//                 return res.status(401).json({ access: false, message: 'Invalid token', token: process.env.ACCESS_TOKEN_SECRET});
//             } else {
//                 req.user_id = decoded.user_id;
//                 next();
//             }
//         })
//     }
// };

// const renewToken = async (req, res, next) => {
//     const refreshToken = req.cookies.refreshToken;
//     let exist = false;
//     if (!refreshToken) {
//         return res.status(401).json({ valid: false, message: "No refresh token"})
//     } else {
//         jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
//             if (err) {
//                 return res.status(401).json({ valid: false, message: 'Invalid refresh token'});
//             } else {
//                 const token = jwt.sign({ user_id: decoded.user_id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10s' });
//                 res.cookie("accessToken", token, {maxAge: 10000});
//                 exist=true;
//                 next();
//             }
//         })
//     }
//     return exist;
// }