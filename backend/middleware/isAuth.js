import jwt from 'jsonwebtoken';

export default function(req, res, next) {
    const authHeader = req.get("Authorization");
    if(!authHeader) {
        const error = new Error("Not authenticated.");
        error.statusCode = 401;
        throw error;
    }
    const token = authHeader.split(" ")[1];

    try {
        const decodedToken = jwt.verify(token, "secret");

        if (!decodedToken) {
            const error = new Error("Not authenticated");
            error.statusCode = 401;
            throw error;
        }
        req.user_id = decodedToken.user_id;
        console.log(decodedToken.user_id);
        next();
    } catch (error) {
        error.statusCode = 500;
        next(error);
    }
}
