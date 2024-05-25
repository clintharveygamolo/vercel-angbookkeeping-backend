import express from "express";
import {
  createAccount,
  getAccount,
  deleteBankAccount,
  editBankAccount,
} from "../controllers/accountController.js";

const router = express.Router();

router.post("/createAccount", createAccount);
router.get("/getAccount/:user_id", getAccount);
router.delete("/deleteAccount/:account_id", deleteBankAccount);
router.put("/editAccount/:user_id/:account_id", editBankAccount);

export default router;
