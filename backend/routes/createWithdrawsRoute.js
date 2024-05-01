import express from 'express';
import { createWithdraws } from '../controllers/createWithdrawsController.js';

const router = express.Router();

router.post('/createWithdraw', createWithdraws);

export default router;