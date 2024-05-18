import express from "express";
import { createBank } from "../controllers/bankController.js";

const router = express.Router();

router.post("/createBank", createBank);

export default router;
