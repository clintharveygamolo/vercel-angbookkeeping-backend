import express from 'express';
import isAuth from '../middleware/isAuth.js';
import { editWithdraws } from '../controllers/editWithdrawsController.js';

const router = express.Router();

router.post('/editWithdraw', isAuth, editWithdraws);

export default router;