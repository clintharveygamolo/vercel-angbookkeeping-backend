import Company from '../models/CompanyModel.js';
import Bank from '../models/BankModel.js';
import Withdraw from '../models/withdrawsModel.js';
import Deposit from '../models/depositsModel.js';

export default function setAssociations() {
    Company.hasMany(Bank, { foreignKey: 'company_id' })
    Bank.belongsTo(Company, { foreignKey: 'company_id' });
    Bank.hasMany(Deposit, { foreignKey: 'bank_id' });
    Bank.hasMany(Withdraw, { foreignKey: 'bank_id' });

    Deposit.belongsTo(Bank, { foreignKey: 'bank_id'});
    Withdraw.belongsTo(Bank, { foreignKey: 'bank_id'});
}
