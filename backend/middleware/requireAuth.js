import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/userModel";

dotenv.config();
const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user_id = decodedToken.user_id;
    next();
  } catch (err) {
    res.status(401).json({ message: "Request is not authorized" });
  }
};
