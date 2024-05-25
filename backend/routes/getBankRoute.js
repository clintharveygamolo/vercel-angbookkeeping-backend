import express from "express";
import { getBanks } from "../controllers/getBankController.js";

const router = express.Router();

router.get("/getBank", getBanks);

export default router;
