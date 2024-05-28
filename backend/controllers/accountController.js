import Company from "../models/CompanyModel.js";
import Bank from "../models/BankModel.js";
import Account from "../models/accountModel.js";
import User from "../models/userModel.js";
import { Op } from "sequelize";

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
      return res.status(404).json({ message: "User not found" });
    }

    if (currentUser.role !== "Admin") {
      return res
        .status(403)
        .json({ message: "Forbidden: Only admin users can create accounts." });
    }

    const company = await Company.findByPk(company_id);
    if (!company) {
      return res.status(404).json({ message: "Valid company required" });
    }

    const bank = await Bank.findByPk(bank_id);
    if (!bank) {
      return res.status(404).json({ message: "Valid bank required" });
    }

    const numericRegex = /^\d+$/;
    if (!numericRegex.test(account_number)) {
      return res
        .status(404)
        .json({ message: "account_number must be a number" });
    }
    const existingAccount = await Account.findOne({
      where: { bank_code: bank_code },
    });
    if (existingAccount) {
      return res.status(409).json({ message: "Bank Code already exists" });
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
      return res.status(404).json({ message: "User not found" });
    }

    if (currentUser.role !== "Admin") {
      return res
        .status(403)
        .json({ message: "Forbidden: Only admin users can create accounts." });
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
        .json({ message: "Forbidden: Only admin users can edit accounts." });
    }

    const account = await Account.findByPk(account_id);
    if (!account) {
      return res.status(404).json({ message: "Account not found!" });
    }

    const existingAccount = await Account.findOne({
      where: { bank_code: bank_code, account_id: { [Op.ne]: account_id } },
    });

    if (existingAccount) {
      return res.status(409).json({ message: "Bank code already exists!" });
    }

    const updatedFields = {};

    if (company_id) {
      updatedFields.company_id = company_id;
    }

    if (bank_id) {
      updatedFields.bank_id = bank_id;
    }

    if (account_number) {
      updatedFields.account_number = account_number;
    }

    if (bank_code) {
      updatedFields.bank_code = bank_code;
    }

    await account.update(updatedFields);

    return res.status(201).json({
      message: "User information successfully updated!",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occured while updating the account." });
  }
}
