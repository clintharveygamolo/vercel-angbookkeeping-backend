import express from "express";
import { editAccount } from "../controllers/editAccountController.js";

const router = express.Router();

router.put("/editUser", editAccount);

export default router;
