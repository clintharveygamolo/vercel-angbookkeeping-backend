import express from 'express';
import { logOut } from '../controllers/logoutController.js';
import verifyToken from '../middleware/isAuthCookie.js';

const router = express.Router();

router.delete('/logout', verifyToken, logOut);

export default router;

