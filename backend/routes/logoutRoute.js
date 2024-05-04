import express from 'express';
import { logOut } from '../controllers/logoutController.js';
import isAuthCookie from '../middleware/isAuthCookie.js';

const router = express.Router();

router.delete('/logout', isAuthCookie, logOut);

export default router;

