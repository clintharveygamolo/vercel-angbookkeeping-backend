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
            company_id: company.id, // Use the id of the existing company
            bank_id: bank.id,       // Use the id of the existing bank
        });

        res.status(201).json({ message: "Account created successfully", company, bank, account });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
