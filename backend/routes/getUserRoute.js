import express from 'express';
import isAuthCookie from '../middleware/isAuthCookie.js';
import { getUsers } from '../controllers/getUsersController.js';

const router = express.Router();

router.get('/users', getUsers);

export default router;

