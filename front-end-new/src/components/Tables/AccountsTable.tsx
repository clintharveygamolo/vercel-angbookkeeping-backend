import { BankAccount } from '../../types/Accounts';
import MultiSelect from '../Forms/MultiSelect';


const bankaccount: BankAccount[] = [
    {
        CompanyName: 'Chickenne',
        Bank: 'BDO',
        AccountType: 'CA',
        AccountNumber: 1234567,
        BankCode: 'BDO1',
    },
];

const AccountsTable = () => {
    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="flex items-center justify-between mb-6">
                <h4 className="text-xl font-semibold text-black dark:text-white">Accounts</h4>
                <div className="flex flex-grow items-center space-x-4 ml-8">  {/* Added margin-left here */}
                    <MultiSelect id="BankType" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="flex-grow rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                </div>
            </div>



            <div className="flex flex-col">
                <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
                    <div className="p-2.5 xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Company Name
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Bank
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Account Type
                        </h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Account Number
                        </h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Bank Code
                        </h5>
                    </div>
                </div>

                {bankaccount.map((bnkacct, key) => (
                    <div
                        className={`grid grid-cols-3 sm:grid-cols-5 ${key === bankaccount.length - 1
                            ? ''
                            : 'border-b border-stroke dark:border-strokedark'
                            }`}
                        key={key}
                    >
                        <div className="flex items-center gap-3 p-2.5 xl:p-5">
                            <p className="hidden text-black dark:text-white sm:block">
                                {bnkacct.CompanyName}
                            </p>
                        </div>

                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <p className="text-black dark:text-white">{bnkacct.Bank}</p>
                        </div>

                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <p className="text-meta-3">{bnkacct.AccountType}</p>
                        </div>

                        <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                            <p className="text-black dark:text-white">{bnkacct.AccountNumber}</p>
                        </div>

                        <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                            <p className="text-meta-5">{bnkacct.BankCode}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AccountsTable;
