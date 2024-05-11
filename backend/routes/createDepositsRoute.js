import express from 'express';
import { createDeposits } from '../controllers/createDepositsController.js';

const router = express.Router();

router.post('/createDeposit', createDeposits);

export default router;