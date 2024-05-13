/*import Account from "../models/accountModel.js";
import User from "../models/userModel.js";

export async function createAccount(req, res) {
    try {
        await Account.create({
            account_id: req.body.account_id,
            company_name: req.body.company_name,
            bank_code: req.body.bank_code,
            bank_name: req.body.bank_name,
            account_type: req.body.account_type,
            account_number: req.body.account_number
        });

        res.status(201).json("Account Entry Successfully Created.");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occured while creating the entry."});
    }
};*/