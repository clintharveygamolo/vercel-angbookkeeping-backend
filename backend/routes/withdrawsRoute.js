import express from 'express';
import { createWithdraws, editWithdraws, deleteWithdraws, getWithdraw, getWithdraws } from '../controllers/withdrawsController.js';

const router = express.Router();

router.post('/Create', createWithdraws);
router.put('/Edit', editWithdraws);
router.delete('/Delete/:withdraw_id', deleteWithdraws);
router.get('/Get', getWithdraws);
router.get('/GetID', getWithdraw);

export default router;