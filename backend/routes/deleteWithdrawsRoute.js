import express from 'express';
import isAuth from '../middleware/isAuth.js';
import { deleteWithdraws } from '../controllers/deleteWithdrawsController.js'
const router = express.Router();

router.post('/deleteWithdraw', isAuth, deleteWithdraws);

export default router;