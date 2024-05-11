import express from 'express';
import isAuth from '../middleware/isAuth.js';
import { createDeposits, editDeposits, deleteDeposits } from '../controllers/depositsController.js';

const router = express.Router();

router.post('/Deposits', createDeposits);
router.post('/Deposits', isAuth, editDeposits);
router.post('/Deposits', isAuth, deleteDeposits);

export default router;