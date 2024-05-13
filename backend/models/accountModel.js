/*import sequelize from "../util/database";
import { DataTypes } from 'sequelize';
import AccountType from "../models/accountTypeModel";
import AccountNumber from "../models/accountNumberModel";
import BankCode from "../models/bankCodeModel";
import Bank from "../models/BankModel";
import Company from "../models/CompanyModel";
import Deposit from "./depositsModel";
import Withdraws from "./withdrawsModel";

const Account = sequelize.define("Account", {
    account_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    company_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bank_code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bank_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    account_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    account_number: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

Account.hasMany(Company, {foreignKey: "company_id"});
Company.belongsTo(Account, {foreignKey: "account_id"});
Company.hasMany(Bank, {foreignKey: "bank_id"});
Company.hasMany(BankCode, {foreignKey: "bank_code_id"});
Bank.belongsTo(Account, {foreignKey: "bank_id"});
Bank.belongsTo(Company, {foreignKey: "bank_id"});
Bank.hasMany(BankCode, {foreignKey: "bank_code_id"});
Bank.hasMany(AccountType, {foreignKey: "account_type_id"});
Bank.hasMany(AccountNumber, {foreignKey: "account_number"});
BankCode.belongsTo(Company, {foreignKey: "bank_code_id"});
BankCode.belongsTo(Bank, {foreignKey: "bank_code_id"});
BankCode.hasOne(AccountNumber, {foreignKey: "bank_code_id"});
BankCode.hasOne(AccountType, {foreignKey: "bank_code_id"});
BankCode.hasMany(Deposit, {foreignKey: "bank_code_id"});
BankCode.hasMany(Withdraws, {foreignKey: "bank_code_id"});
AccountNumber.belongsTo(BankCode, {foreignKey: "account_number"});
AccountType.belongsTo(BankCode, {foreignKey: "account_type_id"});
Deposit.belongsTo(BankCode, {foreignKey: "deposit_id"});
Withdraws.belongsTo(BankCode, {foreignKey: "withdraw_id"});

export default Account;*/