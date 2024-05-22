import express from 'express';
import { createAccount, editAccount, deleteAccount } from '../controllers/accountController.js';

const router = express.Router();

router.post('/Create', createAccount);
router.post('/Edit', editAccount);
router.post('/Delete', deleteAccount);

export default router;
