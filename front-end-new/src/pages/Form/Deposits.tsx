//'use client';

import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';

import DatePickerOne from '../../components/Forms/DatePicker/DatePickerOne';

import axiosConfig from '../../api/axiosconfig.js';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import React from "react";
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

import SelectGroupThree from '../../components/Forms/SelectGroup/SelectGroupThree.js';

import * as Yup from 'yup';

export type AccountOption = { value: number; label: string };

export type Deposits = {
  date: string;
  check_no: number;
  particulars: string;
  remarks: string;
  amount: number;
};

export const validateCreateDepositFormSchema = Yup.object().shape({
  date: Yup.string().required('Date is required'),
  check_no: Yup.number().positive().required('Check number is required'),
  particulars: Yup.string().required('Particulars are required'),
  remarks: Yup.string(),
  amount: Yup.number().positive().required('Amount is required'),
});

const Deposits = () => {

  const validateCreateDepositForm = async (values: Deposits) => {
    try {
      await validateCreateDepositFormSchema.validate(values, { abortEarly: false });
      return true;
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          toast.error(error.message, {
            position: 'top-right',
          });
        });
      } else {
        toast.error('An unexpected error occurred during validation!');
      }
      return false;
    }
  };

  //date
  const [date, setDate] = useState('');
  /*
    const [check_noValue, setcheck_noValue] = useState();
    const [particularsValue, setparticularsValue] = useState('');
    const [remarksValue, setremarksValue] = useState('');
    const [amountValue, setamountValue] = useState();
  */

  const [check_noValue, setcheck_noValue] = useState<number>();
  const [particularsValue, setparticularsValue] = useState<string>('');
  const [remarksValue, setremarksValue] = useState<string>('');
  const [amountValue, setamountValue] = useState<number>();


  /*const createDeposit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (AccountIdDropDownValue === null) {
      toast.error('Please select a Bank Code');
      return;
    }

    try {
      const response = await axiosConfig.post(
        '/api/auth/Deposits/Create',
        {
          date: date,
          check_no: check_noValue,
          particulars: particularsValue,
          remarks: remarksValue,
          amount: amountValue,
          account_id: AccountIdDropDownValue,
        },
        { withCredentials: true },
      );

      if (response.status === 201) {
        toast.success('Created a deposit!');
      }
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data.message);
      } else if (err instanceof Error) {
        console.error('Error:', err);
      }
    }
  };*/

  const createDeposit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (AccountIdDropDownValue === null) {
      toast.error('Please select a Bank Code');
      return;
    }

    const depositData = {
      date: date,
      check_no: check_noValue,
      particulars: particularsValue,
      remarks: remarksValue,
      amount: amountValue,
      account_id: AccountIdDropDownValue,
    };

    const isValid = await validateCreateDepositForm(depositData);
    if (!isValid) return;

    try {
      const response = await axiosConfig.post(
        '/api/auth/Deposits/Create',
        depositData,
        { withCredentials: true },
      );

      if (response.status === 201) {
        toast.success('Created a deposit!');
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
    createDeposit(e);
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
      <Breadcrumb pageName="Add Deposits" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          {/* <!-- Find Account --> */}
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
      </div>

      {/*   FORM    */}

      <form onSubmit={handleSubmit}>
        <div className="my-6 py-1 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="py-6 px-4 md:px-6 xl:px-7.5 flex items-center justify-between">
            <h4 className="text-xl font-semibold text-black dark:text-white">
              Add Deposit
            </h4>
            <button className="bg-primary text-white rounded-lg px-4 py-2 hover:bg-primary-dark">
              Add
            </button>
          </div>

          <div className="grid grid-cols-4 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
            <div className="col-span-2 flex items-center">
              <p className="font-medium">Date</p>
            </div>
            <div className="col-span-2 flex items-center">
              <p className="font-medium">Check Number</p>
            </div>
            <div className="col-span-2 flex items-center">
              <p className="font-medium">Particular</p>
            </div>
            <div className="col-span-2 flex items-center">
              <p className="font-medium">Remarks</p>
            </div>
          </div>

          <div className="grid grid-cols-4 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
            <div className="col-span-2 flex items-center">
              <div>
                <DatePickerOne value={date} onChange={setDate} />
              </div>
            </div>
            <div className="col-span-2 flex items-center">
              <div>
                <input
                  id="check_no_input"
                  value={check_noValue}
                  type="text"
                  placeholder="Check Number"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  onChange={(e: any) =>
                    setcheck_noValue(e.target.value)
                  }
                />
              </div>
            </div>
            <div className="col-span-2 flex items-center">
              <div>
                <input
                  id="particular_input"
                  value={particularsValue}
                  type="text"
                  placeholder="Particular"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  onChange={(e: any) =>
                    setparticularsValue(e.target.value)
                  }
                />
              </div>
            </div>
            <div className="col-span-2 flex items-center">
              <div>
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
          </div>

          <div className="grid grid-cols-4 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
            <div className="col-span-2 flex items-center">
              <p className="font-medium">Amount</p>
            </div>
          </div>
          <div className="grid grid-cols-1 border-t border-stroke py-4.5 px-4 dark:border-strokedark md:px-6 2xl:px-7.5">
            <div className="col-span-1 flex items-center">
              <div>
                <input
                  id="amount_input"
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
      </form>
      <ToastContainer />
    </DefaultLayout>
  );
};

export default Deposits;
