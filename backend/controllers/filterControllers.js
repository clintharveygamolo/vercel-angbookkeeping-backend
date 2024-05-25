
import Deposit from "../models/depositsModel.js";
import Account from "../models/accountModel.js";

export const filterTransactions = async (req, res) => {
    try {
        const { bankCode } = req.params;

        // Find account by bank code
        const account = await Account.findOne({ where: { bank_code: bankCode } });
        if (!account) {
            return res.status(404).json({ error: "Account not found" });
        }

        // Find deposits by account id
        const deposits = await Deposit.findAll({ where: { account_id: account.account_id } });

        return res.status(200).json(deposits);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
