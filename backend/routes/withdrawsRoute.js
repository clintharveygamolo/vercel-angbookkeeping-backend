import express from 'express';
import { createWithdraws, editWithdraws, deleteWithdraws, getWithdraw, getWithdraws } from '../controllers/withdrawsController.js';

const router = express.Router();

router.post('/Create', createWithdraws);
router.post('/Edit', editWithdraws);
router.post('/Delete', deleteWithdraws);
router.get('/Get', getWithdraws);
router.get('/GetID', getWithdraw);

export default router;