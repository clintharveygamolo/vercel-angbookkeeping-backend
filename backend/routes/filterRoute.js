
import express from "express";
import { filterTransactions, getAllTransactions } from "../controllers/filterControllers.js";

const router = express.Router();

router.get("/transactions/:bankCode", filterTransactions);
router.get("/transactions", getAllTransactions);

export default router;