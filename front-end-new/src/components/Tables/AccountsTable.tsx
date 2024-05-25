import { SetStateAction, useState, useEffect, useRef } from 'react';
import MultiSelect from '../Forms/MultiSelect';
import { Button, Label, Modal, TextInput } from 'flowbite-react';
import axios from '../../api/axiosconfig';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import SelectGroupOne, {
  FromDBDropdownFormProps,
} from '../../components/Forms/SelectGroup/SelectGroupOne';
import SelectGroupThree from '../../components/Forms/SelectGroup/SelectGroupThree';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AxiosError } from 'axios';

export type Account = {
  account_id: number;
  companyName: string;
  bank_name: string;
  bank_code: string;
  account_number: number;
};

const AccountsTable = () => {
  const userInputRefInputRef = useRef<HTMLInputElement>(null);
  const [bankAccounts, setBankAccounts] = useState<Account[] | null>();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const auth: any = useAuthUser();

  // For Bank and Company Dropdowns
  const [bankCodeFormValue, setBankCodeFormValue] = useState('');
  const [accountNumberFormValue, setAccountNumberFormValue] = useState('');
  const [companyDropDownValue, setCompanyDropdownValue] = useState<number>();
  const [bankDropdownValue, setBankDropdownValue] = useState<number>();
  const [companyDropdownOptions, setCompanyDropdownOptions] = useState<
    FromDBDropdownFormProps['options']
  >([]);
  const [bankDropdownOptions, setBankDropdownOptions] = useState<
    FromDBDropdownFormProps['options']
  >([]);

  // Company dropdown getter
  const getCompanyValue = (value: any) => {
    setCompanyDropdownValue(value);
  };

  // Bank dropdown getter
  const getBankValue = (value: any) => {
    setBankDropdownValue(value);
  };
  // Setting user to delete
  const [accountToDelete, setAccountToDelete] = useState<number>(0);

  useEffect(() => {
    const fetchCompanyNames = async () => {
      try {
        const response = await axios.get('/api/company/getCompany/');
        if (response.status === 200) {
          const companies = response.data;
          const options = companies.map(
            (company: { companyName: any; company_id: any }) => ({
              value: company.company_id,
              label: company.companyName,
            }),
          );
          setCompanyDropdownOptions(options);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchCompanyNames();
  }, []);

  useEffect(() => {
    const fetchBankNames = async () => {
      try {
        const response = await axios.get('/api/bank/getBank');
        if (response.status === 200) {
          const banks = response.data;
          const options = banks.map(
            (bank: { bank_id: any; bank_name: any }) => ({
              value: bank.bank_id,
              label: bank.bank_name,
            }),
          );
          setBankDropdownOptions(options);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchBankNames();
  }, []);

  useEffect(() => {
    axios({
      method: 'GET',
      url: `/api/account/getAccount/${auth.user_id}`,
    })
      .then(
        (response: { data: SetStateAction<Account[] | null | undefined> }) => {
          setBankAccounts(response.data);
          console.log(response.data);
        },
      )
      .catch((error: any) => console.error(error));
  }, [auth.user_id]);

  const editBankAccount = async (account_id: number) => {
    try {
      const response = await axios.put(
        `/api/account/editAccount/${auth.user_id}/${account_id}`,
        {
          bank_code: bankCodeFormValue,
          account_number: accountNumberFormValue,
          bank_id: bankDropdownValue,
          company_id: companyDropDownValue,
        },
      );

      if (response.status === 201) {
        toast.success(response.data.message);
        // const updatedBankAccounts = bankAccounts?.filter(
        //   (account) => account.account_id !== accountToDelete,
        // );
        const updatedAccounts = await axios.get(
          `/api/account/getAccount/${auth.user_id}`,
        );
        setBankAccounts(updatedAccounts.data);
        setOpenEditModal(false);
      }
    } catch (err) {
      if (err && err instanceof AxiosError) {
        toast.error(err.response?.data.message);
      } else if (err && err instanceof Error) {
        console.log('Error: ', err);
      }
      console.error('Error editing user', err);
    }
  };

  const deleteBankAccount = async (account_id: number) => {
    try {
      const response = await axios.delete(
        `/api/account/deleteAccount/${account_id}`,
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        const updatedBankAccounts = bankAccounts?.filter(
          (account) => account.account_id !== accountToDelete,
        );
        setBankAccounts(updatedBankAccounts);
        setOpenDeleteModal(false);
      }
    } catch (err) {
      if (err && err instanceof AxiosError) {
        toast.error(err.response?.data.message);
      } else if (err && err instanceof Error) {
        console.log('Error: ', err);
      }
      console.error('Error deleting user', err);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Accounts
        </h4>
        <div className="flex flex-grow items-center space-x-4 ml-8">
          {' '}
          {/* Added margin-left here */}
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
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Bank Code
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Account Number
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Actions
            </h5>
          </div>
        </div>

        {bankAccounts &&
          bankAccounts.map((bankAccount) => (
            <div
              // className={`grid grid-cols-3 sm:grid-cols-5 ${
              //   key === bankAccount
              //     ? ''
              //     : 'border-b border-stroke dark:border-strokedark'
              // }`}
              className={
                'grid grid-cols-3 sm:grid-cols-5 border-b border-stroke dark:border-strokedark'
              }
            // key={key}
            >
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <p className="hidden text-black dark:text-white sm:block">
                  {`${bankAccount.companyName} ${bankAccount.account_id}`}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">
                  {bankAccount.bank_name}
                </p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-meta-5">{bankAccount.bank_code}</p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-black dark:text-white">
                  {bankAccount.account_number}
                </p>
              </div>
              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <div className="flex items-center space-x-3.5">
                  <button
                    className="hover:text-primary"
                    onClick={() => {
                      setOpenEditModal(true);
                      setAccountToDelete(bankAccount.account_id);
                    }}
                  >
                    <svg
                      className="fill-current"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                        fill=""
                      />
                      <path
                        d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                        fill=""
                      />
                    </svg>
                  </button>
                </div>
                <div className="flex items-center space-x-3.5">
                  <button
                    className="hover:text-primary"
                    onClick={() => {
                      setOpenDeleteModal(true);
                      setAccountToDelete(bankAccount.account_id);
                    }}
                  >
                    <svg
                      className="fill-current"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                        fill=""
                      />
                      <path
                        d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                        fill=""
                      />
                      <path
                        d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                        fill=""
                      />
                      <path
                        d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                        fill=""
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
      <Modal
        show={openEditModal}
        size="md"
        popup
        onClose={() => setOpenEditModal(false)}
        initialFocus={userInputRefInputRef}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-2">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Edit Account
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Bank Code" />
              </div>
              <TextInput
                id="bank_code"
                // value={editModalPassword}
                onChange={(e: any) => setBankCodeFormValue(e.target.value)}
                type="text"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Account Number" />
              </div>
              <TextInput
                id="account_no"
                // value={editModalPassword}
                onChange={(e: any) => setAccountNumberFormValue(e.target.value)}
                type="text"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="company_name" value="Company Name" />
              </div>
              <SelectGroupThree
                label={'Company Name'}
                options={companyDropdownOptions}
                onSelect={getCompanyValue}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Bank" />
              </div>
              <SelectGroupThree
                label={'Bank'}
                options={bankDropdownOptions}
                onSelect={getBankValue}
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => editBankAccount(accountToDelete)}
                className="flex justify-center rounded bg-primary p-3 font-small text-gray hover:bg-opacity-90"
              >
                Edit Account
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={openDeleteModal}
        size="md"
        popup
        onClose={() => setOpenDeleteModal(false)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Modal.Header />
        <Modal.Body>
          <div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Delete Account
            </h3>
            <p>`Are you sure you want to delete this account?`</p>
            <Button
              className="bg-red-700 text-white rounded-lg px-1 py-1 hover:bg-primary-dark hover:bg-opacity-90"
              onClick={() => {
                deleteBankAccount(accountToDelete);
              }}
            >
              Confirm Delete
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default AccountsTable;
