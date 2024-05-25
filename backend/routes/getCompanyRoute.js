import express from "express";
import { getCompanies } from "../controllers/getCompanyController.js";

const router = express.Router();

router.get("/getCompany", getCompanies);

export default router;
