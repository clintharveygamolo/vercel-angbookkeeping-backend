import Deposit from "../models/depositsModel.js";
import Withdraw from "../models/withdrawsModel.js"
import Account from "../models/accountModel.js";

export const filterTransactions = async (req, res) => {
    try {
        const { bankCode } = req.params;

        // Find account by bank code
        const account = await Account.findOne({ where: { bank_code: bankCode } });
        if (!account) {
            return res.status(404).json({ error: "Bank not found" });
        }

        // Find deposits and withdrawals by account id
        const deposits = await Deposit.findAll({ where: { account_id: account.account_id } });
        const withdrawals = await Withdraw.findAll({ where: { account_id: account.account_id } });

        return res.status(200).json({ deposits, withdrawals });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Controller to get all deposits and withdrawals
export const getAllTransactions = async (req, res) => {
    try {
        const deposits = await Deposit.findAll();
        const withdrawals = await Withdraw.findAll();

        return res.status(200).json({ deposits, withdrawals });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
