import User from "./models/userModel.js";
import Bank from "./models/BankModel.js";
import Company from "./models/CompanyModel.js";
import Account from "./models/accountModel.js";
import Deposit from "./models/depositsModel.js";
import Withdraw from "./models/withdrawsModel.js";
import bcrypt from "bcrypt";

export async function injectInitialData() {
  try {
    // Admin User
    const adminPass = await bcrypt.hash("adminpass", 12);
    await User.create({
      name: "Clint Harvey Gamolo",
      password: adminPass,
      role: "Admin",
    });

    // Banks
    const banks = ["BDO", "BPI", "SB", "BANKWAYS"];
    for (const bankName of banks) {
      await Bank.create({ bank_name: bankName });
    }

    // Companies
    const companies = [
      "Ang Architecture",
      "Gamolo Construction Services",
      "Din's Car Rental Services",
      "Roa Hotels Inc.",
    ];
    for (const companyName of companies) {
      await Company.create({ companyName });
    }

    // Accounts
    const accounts = [
      { account_number: 1234567, bank_code: "BDO1", company_id: 1, bank_id: 1 },
      { account_number: 7654321, bank_code: "BDO2", company_id: 1, bank_id: 1 },
      { account_number: 2345234, bank_code: "BPI1", company_id: 2, bank_id: 2 },
      {
        account_number: 983514,
        bank_code: "BANKWAYS1",
        company_id: 3,
        bank_id: 4,
      },
    ];
    for (const account of accounts) {
      await Account.create(account);
    }

    // Deposits
    const deposits = [
      {
        date: "12/13/2024",
        check_no: 1,
        particulars: "Din Shane Magallanes",
        remarks: "Sample remark",
        amount: 100,
        account_id: 1,
      },
      {
        date: "12/13/2024",
        check_no: 2,
        particulars: "Din Shane Taclob",
        remarks: "Remark",
        amount: 10000,
        account_id: 1,
      },
      {
        date: "12/13/2022",
        check_no: 3,
        particulars: "Randell San",
        remarks: "Purchase",
        amount: 100,
        account_id: 4,
      },
      {
        date: "12/13/2023",
        check_no: 12,
        particulars: "ClintStone",
        remarks: "Guns",
        amount: 1010,
        account_id: 3,
      },
    ];
    for (const deposit of deposits) {
      await Deposit.create(deposit);
    }

    // Withdrawals
    const withdrawals = [
      {
        date: "11/13/2024",
        check_no: 1,
        voucher_no: 1,
        payee: "Din",
        amount: 13000,
        account_id: 1,
      },
      {
        date: "11/11/2024",
        check_no: 12,
        voucher_no: 31,
        payee: "Stepheniga",
        amount: 696969,
        account_id: 2,
      },
    ];
    for (const withdrawal of withdrawals) {
      await Withdraw.create(withdrawal);
    }

    console.log("Initial data injection completed successfully.");
  } catch (error) {
    console.error("Error injecting initial data:", error);
  }
}
