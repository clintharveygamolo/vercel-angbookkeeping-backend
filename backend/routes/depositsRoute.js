import express from 'express';
import { createDeposits, editDeposits, deleteDeposits, getDeposits, getDeposit } from '../controllers/depositsController.js';

const router = express.Router();

router.post('/Create', createDeposits);
router.put('/Edit', editDeposits);
router.delete('/Delete/:deposit_id', deleteDeposits);
router.get('/Get', getDeposits);
router.get('/GetID', getDeposit);

export default router;