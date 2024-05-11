import express from 'express';
import isAuth from '../middleware/isAuth.js';
import { deleteDeposits } from '../controllers/deleteDepositsController.js'
const router = express.Router();

router.post('/deleteDeposit', isAuth, deleteDeposits);

export default router;