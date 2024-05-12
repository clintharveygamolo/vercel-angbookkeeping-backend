import express from 'express';
import { refreshJWT } from '../controllers/refreshController.js';

const router = express.Router();

router.delete('/refresh', refreshJWT);

export default router;

