import express from 'express';
import isAuth from '../middleware/isAuth.js';
import { editDeposits } from '../controllers/editDepositsController.js';

const router = express.Router();

router.post('/editWithdraw', isAuth, editDeposits);

export default router;