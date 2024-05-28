import express from 'express';
import { deleteUser } from '../controllers/deleteUserController.js'
const router = express.Router();

router.delete('/deleteUser/:user_id', deleteUser);

export default router;