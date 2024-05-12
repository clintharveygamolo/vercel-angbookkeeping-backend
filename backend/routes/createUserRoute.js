import express from 'express';
import isAuth from '../middleware/isAuth.js';
import { createUser } from '../controllers/createUserController.js';

const router = express.Router();

router.post('/createUser', createUser);

export default router;