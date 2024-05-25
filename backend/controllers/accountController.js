import Company from "../models/CompanyModel.js";
import Bank from "../models/BankModel.js";
import Account from "../models/accountModel.js";
import User from "../models/userModel.js";

export const createAccount = async (req, res) => {
  try {
    const {
      user_id,
      account_number,
      account_type,
      bank_code,
      bank_id,
      company_id,
    } = req.body;

    const currentUser = await User.findByPk(user_id);

    if (!currentUser) {
      return res.status(404).json({ error: "User not found" });
    }

    if (currentUser.role !== "Admin") {
      return res
        .status(403)
        .json({ error: "Forbidden: Only admin users can create accounts." });
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
      bank_code: bank_code,
      account_number: account_number,
      account_type: account_type,
      company_id: company_id, // Use the id of the existing company
      bank_id: bank_id, // Use the id of the existing bank
    });

    return res.status(201).json({
      message: "Account created successfully",
      company,
      bank,
      account,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAccount = async (req, res) => {
  try {
    const { user_id } = req.params;
    const currentUser = await User.findByPk(user_id);
    if (!currentUser) {
      return res.status(404).json({ error: "User not found" });
    }

    if (currentUser.role !== "Admin") {
      return res
        .status(403)
        .json({ error: "Forbidden: Only admin users can create accounts." });
    }

    const accounts = await Account.findAll({
      include: [
        {
          model: Company,
          attributes: ["company_id", "companyName"],
        },
        {
          model: Bank,
          attributes: ["bank_id", "bank_name"],
        },
      ],
    });

    const formattedAccounts = accounts.map((account) => ({
      account_id: account.account_id,
      companyName: account.Company.companyName,
      bank_name: account.Bank.bank_name,
      bank_code: account.bank_code,
      account_number: account.account_number,
    }));

    return res.status(200).json(formattedAccounts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export async function deleteBankAccount(req, res) {
  const { account_id } = req.params;
  try {
    const account = await Account.findByPk(account_id);
    if (!account) {
      return res.status(404).json({ message: "Account not found!" });
    }
    await account.destroy();
    return res.status(200).json({ message: "Account successfully deleted!" });
  } catch (error) {
    return res.status(400).json({
      message: "An error occured while attempting to delete account!",
    });
  }
}

export async function editBankAccount(req, res) {
  try {
    const { user_id, account_id } = req.params;
    const { bank_code, account_number, bank_id, company_id } = req.body;
    const currentUser = await User.findByPk(user_id);

    if (currentUser.role !== "Admin") {
      return res
        .status(403)
        .json({ message: "Forbidden: Only admin users can create new users." });
    }

    if ((!bank_code, !account_number, !bank_id, !company_id)) {
      return res
        .status(401)
        .json({ message: " All fields are required to edit!" });
    }
    const account = await Account.findByPk(account_id);
    if (!account) {
      return res.status(404).json({ message: "Account not found!" });
    }
    const updatedAccount = account.update({
      bank_code: bank_code,
      account_number: account_number,
      bank_id: bank_id,
      company_id: company_id,
    });

    return res
      .status(201)
      .json({
        message: "User information successfully updated!",
        updated: updatedAccount,
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occured while updating the user." });
  }
}
