
import express from "express";
import { filterTransactions } from "../controllers/filterControllers.js";

const router = express.Router();

router.get("/transactions/:bankCode", filterTransactions);

export default router;