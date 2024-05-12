import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/userModel.js';

dotenv.config();
export async function refreshJWT(req, res) {
    const { refreshToken } = req.body; 

    if (!refreshToken) {
        res.status(401).json({ message: "Unauthorized request"});
    }

    try {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
            if (err) {
                console.log(err);
                res.status(403).json({ message: "Invalid refresh token!"});
            } else {
                const user_id = decoded.user_id;
                const user = await User.findByPk(user_id);

                if (!user) {
                    return res.status(403).json({ message: "Invalid refresh token!"});
                }

                const accessToken = jwt.sign({ user_id: decoded.user_id }, process.env.REFRESH_TOKEN_SECRET);

                return res.status(200).send({ accessToken: accessToken});
            }

            const user_id = decoded.user_id;
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error!"});
    }
}
