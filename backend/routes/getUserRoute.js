import express from 'express';
import isAuthCookie from '../middleware/isAuthCookie.js';
import { getUsers, getUser } from '../controllers/getUserController.js';

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:user_id', getUser);

export default router;

