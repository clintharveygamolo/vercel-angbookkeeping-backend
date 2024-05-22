import Company from '../models/CompanyModel.js';
import Bank from '../models/BankModel.js';
import Account from '../models/accountModel.js';
import User from '../models/userModel.js';

export const createAccount = async (req, res) => {
    try {
        const { user_id, account_number, company_id, bank_id, bankCode } = req.body;

        const currentUser = await User.findByPk(user_id);

        if (!currentUser) {
            return res.status(404).json({ error: "User not found" });
        }

        if (currentUser.role !== 'Admin') {
            return res.status(403).json({ error: "Forbidden: Only admin users can create accounts." });
        }

        const company = await Company.findByPk(company_id);
        if (!company) {
            return res.status(404).json({ error: "Company not found" });
        }

        const bank = await Bank.findByPk(bank_id);
        if (!bank) {
            return res.status(404).json({ error: "Bank not found" });
        }

        const account = await Account.create({
            bankCode: bankCode,
            account_number: account_number,
            company_id: company.id,
            bank_id: bank.id,
        });

        res.status(201).json({ message: "Account Created Successfully", company, bank, account });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const editAccount = async (req, res) => {
    try {
        const { user_id, account_number, company_id, bank_id, bankCode, newBankCode } = req.body;

        // Find the current user
        const currentUser = await User.findByPk(user_id);

        if (!currentUser) {
            return res.status(404).json({ error: "User not found" });
        }

        if (currentUser.role !== 'Admin') {
            return res.status(403).json({ error: "Forbidden: Only admin users can edit accounts." });
        }

        const company = await Company.findByPk(company_id);
        if (!company) {
            return res.status(404).json({ error: "Company not found" });
        }

        const bank = await Bank.findByPk(bank_id);
        if (!bank) {
            return res.status(404).json({ error: "Bank not found" });
        }

        if (!bankCode) {
            return res.status(400).json({ error: "Current bank code not provided." });
        }

        const account = await Account.findOne({ where: { bankCode: bankCode } });

        if (!account) {
            return res.status(404).json({ error: "Account not found" });
        }

        await account.update({
            bankCode: newBankCode || bankCode,
            account_number: account_number,
            company_id: company.id,
            bank_id: bank.id,
        });

        res.status(201).json({ message: "Account Edited Successfully.", company, bank, account });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//Account Deletion Function
export const deleteAccount = async (req, res) => {
    try {
        const { user_id, bankCode } = req.body;

        const currentUser = await User.findByPk(user_id);

        if (!currentUser) {
            return res.status(404).json({ error: "User not found" });
        }

        if (currentUser.role !== 'Admin') {
            return res.status(403).json({ error: "Forbidden: Only admin users can create accounts." });
        }

        if (!bankCode) {
            return res.status(401).json({ message: "Deletion failed, bank code not found." });
        }

        await Account.destroy({
            where: {
                bankCode: bankCode
            }
        }
        );

        res.status(201).json("Account Deleted Successfully.");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};