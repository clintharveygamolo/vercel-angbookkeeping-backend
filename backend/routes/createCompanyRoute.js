import express from 'express';
import { createCompany } from '../controllers/createCompanyController.js';

const router = express.Router();

router.post('/createCompany', createCompany);

export default router;

