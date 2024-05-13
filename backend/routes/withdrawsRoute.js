import express from 'express';
import { createWithdraws, editWithdraws, deleteWithdraws } from '../controllers/withdrawsController.js';

const router = express.Router();

router.post('/Create', createWithdraws);
router.post('/Edit/:withdraw_id', editWithdraws);
router.post('/Delete', deleteWithdraws);

export default router;