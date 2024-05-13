import Account from "../models/accountModel.js";
import User from "../models/userModel.js";
import Account from "../models/accountModel.js";
import Bank from "../models/BankModel.js";
import Company from "../models/CompanyModel.js";
import AccountType from "../models/accountTypeModel.js";
import AccountNumber from "../models/accountNumberModel.js";

export async function createAccount(req, res) {
    try {
        const account = await Account.create({
            bank_id: req.body.bank_id,
            company_id: req.body.company_id,
            account_type_id: req.body.account_type_id,
            account_number_id: req.body.account_number_id,
            // Add other account properties
        });

        res.status(201).json(account);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while creating the account." });
    }
}

export async function getAccounts(req, res) {
    try {
        const accounts = await Account.findAll({
            include: [
                { model: Bank },
                { model: Company },
                { model: AccountType },
                { model: AccountNumber }
            ]
        });

        res.status(200).json(accounts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching accounts." });
    }
}

export async function getAccountById(req, res) {
    try {
        const account = await Account.findByPk(req.params.id, {
            include: [
                { model: Bank },
                { model: Company },
                { model: AccountType },
                { model: AccountNumber }
            ]
        });

        if (!account) {
            return res.status(404).json({ error: "Account not found." });
        }

        res.status(200).json(account);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching the account." });
    }
}

export async function updateAccount(req, res) {
    try {
        const account = await Account.findByPk(req.params.id);

        if (!account) {
            return res.status(404).json({ error: "Account not found." });
        }

        await account.update({
            // Update account properties
        });

        res.status(200).json(account);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while updating the account." });
    }
}

export async function deleteAccount(req, res) {
    try {
        const account = await Account.findByPk(req.params.id);

        if (!account) {
            return res.status(404).json({ error: "Account not found." });
        }

        await account.destroy();

        res.status(204).json();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while deleting the account." });
    }
}

export async function createAccounts(req, res) {
    try {
        await Deposits.create({
            deposit_id: req.body.deposit_id,
            particular: req.body.particular,
            date: req.body.date,
            amount: req.body.amount,
            remarks: req.body.remarks
        });

        res.status(201).json("Deposit Entry Successfully Created.");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occured while creating the entry."});
    }
}