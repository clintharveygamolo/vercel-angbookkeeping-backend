'use client';

import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import SelectGroupOne from '../../components/Forms/SelectGroup/SelectGroupOne';
import DefaultLayout from '../../layout/DefaultLayout';
import DatePickerOne from '../../components/Forms/DatePicker/DatePickerOne';

import { useEffect, useState } from 'react';
import axiosConfig from '../../api/axiosconfig.js';
import { ToastContainer, toast } from 'react-toastify';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

import SelectGroupThree from '../../components/Forms/SelectGroup/SelectGroupThree.js';
import axios from 'axios';

export type AccountOption = { value: number; label: string };

export type Withdraws = {
  date: Date;
  check_no: number;
  voucher_no: number;
  payee: string;
  remarks: string;
  amount: number;
};

const Withdraws = () => {
  //date
  const [date, setDate] = useState('');

  const [check_noValue, setcheck_noValue] = useState('');
  const [voucher_noValue, setvoucher_noValue] = useState('');
  const [payeeValue, setpayeeValue] = useState('');
  const [remarksValue, setremarksValue] = useState('');
  const [amountValue, setamountValue] = useState('');

  const createWithdrawal = async (e: React.FormEvent) => {

    if (AccountIdDropDownValue === null) {
      toast.error('Please select an account');
      return;
    }

    e.preventDefault();
    try {
      const response = await axiosConfig.post(
        '/api/auth/Withdrawals/Create',
        {
          date: date,
          check_no: check_noValue,
          voucher_no: voucher_noValue,
          payee: payeeValue,
          remarks: remarksValue,
          amount: amountValue,
          account_id: AccountIdDropDownValue,
        },
        { withCredentials: true },
      );

      if (response.status === 201) {
        toast.success('Created a withdrawal!');
      }
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data.message);
      } else if (err instanceof Error) {
        console.error('Error:', err);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createWithdrawal(e);
  }

  const auth: any = useAuthUser();

  const [AccountIdDropDownValue, setAccountIdDropdownValue] = useState<number | null>(null);
  const [AccountIdDropdownOptions, setAccountIdDropdownOptions] = useState<AccountOption[]>([]);

  // Fetch account options for dropdown
  useEffect(() => {
    const fetchBankCodes = async () => {
      try {
        const response = await axiosConfig.get(`/api/account/getAccount/${auth.user_id}`);
        if (response.status === 200) {
          const accounts = response.data;
          const options = accounts.map((account: { account_id: number; bank_code: string; }) => ({
            value: account.account_id,
            label: account.bank_code,
          }));
          setAccountIdDropdownOptions(options);
        }
      } catch (error) {
        console.error('Error fetching bank codes:', error);
      }
    };
    fetchBankCodes();
  }, [auth.user_id]);

  const getAccountIdValue = (value: any) => {
    setAccountIdDropdownValue(value);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Withdraws" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Find Account
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Company
                    </label>
                    <input
                      type="text"
                      placeholder="Enter company name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/3">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Bank
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Bank"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="w-full xl:w-2/3">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Account Number
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Account #"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-2/3">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Bank Code
                    </label>
                    <SelectGroupThree
                      label={'Bank Code'}
                      options={AccountIdDropdownOptions}
                      onSelect={getAccountIdValue}
                    />
                  </div>
                </div>

                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  Find Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div >

      {/*   FORM    */}


      < form onSubmit={handleSubmit} >
        <div className="my-6 py-1 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="py-6 px-4 md:px-6 xl:px-7.5 flex items-center justify-between">
            <h4 className="text-xl font-semibold text-black dark:text-white">
              Add Withdraws
            </h4>
            <button className="bg-primary text-white rounded-lg px-4 py-2 hover:bg-primary-dark">
              Add
            </button>
          </div>

          <div className="grid grid-cols-3 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
            <div className="col-span-2 flex items-center">
              <p className="font-medium">Date</p>
            </div>
            <div className="px-2 col-span-3 hidden items-center sm:flex">
              <p className="font-medium">Check Number</p>
            </div>
            <div className="col-span-3 flex items-center">
              <p className="font-medium">Invoice Number</p>
            </div>
          </div>

          <div className="grid grid-cols-3 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
            <div className="col-span-2 flex items-center">
              <div className=" ">
                <DatePickerOne value={date} onChange={setDate} />
              </div>
            </div>
            <div className="col-span-3 hidden items-center sm:flex">
              <div className="w-full px-2">
                <input
                  id="check_no_input"
                  value={check_noValue}
                  type="text"
                  placeholder="Check #"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  onChange={(e: any) =>
                    setcheck_noValue(e.target.value)
                  }
                />
              </div>
            </div>
            <div className="col-span-3 flex items-center">
              <div className="w-full">
                <input
                  id="voucher_no_input"
                  value={voucher_noValue}
                  type="text"
                  placeholder="voucher #"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  onChange={(e: any) =>
                    setvoucher_noValue(e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
            <div className="col-span-3 flex items-center">
              <p className="font-medium">Payee</p>
            </div>
            <div className="col-span-3 flex items-center px-2">
              <p className="font-medium">Remarks</p>
            </div>
            <div className="col-span-2 flex items-center">
              <p className="font-medium">Amount</p>
            </div>
          </div>

          <div className="grid grid-cols-3 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
            <div className="col-span-3 hidden items-center sm:flex">
              <div className="w-full">
                <input
                  id="payee_input"
                  value={payeeValue}
                  type="text"
                  placeholder="Payee"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  onChange={(e: any) =>
                    setpayeeValue(e.target.value)
                  }
                />
              </div>
            </div>
            <div className="col-span-3 hidden items-center sm:flex">
              <div className="px-2 w-full">
                <input
                  id="remarks_input"
                  value={remarksValue}
                  type="text"
                  placeholder="Remarks"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  onChange={(e: any) =>
                    setremarksValue(e.target.value)
                  }
                />
              </div>
            </div>
            <div className="col-span-2 flex items-center">
              <div className="w-full">
                <input
                  id="check_no_input"
                  value={amountValue}
                  type="text"
                  placeholder="Amount"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  onChange={(e: any) =>
                    setamountValue(e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </form >
      <ToastContainer />
    </DefaultLayout >
  );
};

export default Withdraws;
