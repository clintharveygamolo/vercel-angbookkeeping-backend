import express from 'express';
import { createDeposits, editDeposits, deleteDeposits } from '../controllers/depositsController.js';

const router = express.Router();

router.post('/Create', createDeposits);
router.post('/Edit', editDeposits);
router.post('/Delete', deleteDeposits);

export default router;