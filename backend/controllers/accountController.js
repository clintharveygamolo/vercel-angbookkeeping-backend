import Company from '../models/CompanyModel.js';
import Bank from '../models/BankModel.js';
import Account from '../models/accountModel.js';
import User from '../models/userModel.js';

export const createAccount = async (req, res) => {
    try {
        const currentUser = await User.findByPk(req.body.user_id);

        const company = await Company.create(req.body.company);

        const bank = await Bank.create(req.body.bank);

        if(currentUser.role !== 'Admin') {
            return res.status(403).json({ error: "Forbidden: Only admin users can create accounts." });
        }

        const account = await Account.create({
            account_number: req.body.account_number,
            company_id: req.body.company_id,
            companyName: req.body.companyName,
            bank_id: req.body.bank_id,
            bankName: req.body.bankName,
            bank_code: req.body.bankCode
        });
        
        res.status(201).json({ company, bank, bankCode, account });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
