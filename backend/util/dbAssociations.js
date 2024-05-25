import Company from "../models/CompanyModel.js";
import Bank from "../models/BankModel.js";
import Withdraw from "../models/withdrawsModel.js";
import Deposit from "../models/depositsModel.js";
import Account from "../models/accountModel.js";

export default function setAssociations() {
  // A company can have multiple banks
  Company.hasMany(Bank, { foreignKey: "company_id" });

  // A bank belongs to a company
  Bank.belongsTo(Company, { foreignKey: "company_id" });

  // A bank can have multiple accounts
  Bank.hasMany(Account, { foreignKey: "bank_id" });

  // An account belongs to a bank
  Account.belongsTo(Bank, { foreignKey: "bank_id" });
  Account.belongsTo(Company, { foreignKey: "company_id" });

  // An account can have multiple withdrawals
  Account.hasMany(Withdraw, { foreignKey: "account_id" });

  // An account can have multiple deposits
  Account.hasMany(Deposit, { foreignKey: "account_id" });

  // A deposit belongs to an account
  Deposit.belongsTo(Account, { foreignKey: "account_id" });

  // A withdrawal belongs to an account
  Withdraw.belongsTo(Account, { foreignKey: "account_id" });
}
