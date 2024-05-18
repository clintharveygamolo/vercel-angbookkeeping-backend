//"use client";

import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import SelectGroupOne from '../components/Forms/SelectGroup/SelectGroupOne';

import { Button, Checkbox, Table, Tabs, Modal, TextInput, Label } from "flowbite-react";
import DatePickerOne from '../components/Forms/DatePicker/DatePickerOne';

import axios from '../api/axiosconfig';
import axiosConfig from '.././api/axiosconfig.js';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export type Deposits = {
  date: Date;
  check_no: number;
  particulars: string;
  remarks: string;
  amount: number;
}

export type Withdraws = {
  date: Date;
  check_no: number;
  voucher_no: number;
  payee: string;
  remarks: number;
  amount: number;
}

const Reports: React.FC = () => {

  const [DepositReport, setDeposits] = useState<Deposits[] | null>();
  const userInputRefInputRef = useRef<HTMLInputElement>(null);

  //values for deposit
  const [DepositDateForm, setDepositDateForm] = useState('');
  const [DepositCheckNo, setDepositCheckNo] = useState(Number);
  const [DepositDateParticulars, setDepositParticulars] = useState('');
  const [DepositRemarks, setDepositRemarks] = useState('');
  const [DepositAmount, setDepositAmount] = useState(Number);

  //edit Modal for Deposit
  const [openModalEditDeposit, setModalEditDeposit] = useState(false);

  const [editModalDepositDate, setEditModalDepositUserDate] = useState<string>(''); //Date please
  const [editModalDepositCheckNo, setEditModalDepositCheckNo] = useState<number>();
  const [editModalDepositParticulars, setEditModalDepositParticulars] = useState<string>('');
  const [editModalDepositRemarks, setEditModalDepositRemarks] = useState<string>('');
  const [editModalDepositAmount, setEditModalDepositAmount] = useState<number>();

  //edit Modal for Withdraws

  const editDeposit = async (deposit_id: number) => {
    e.preventDefault();
    try {
      const response = await axiosConfig.post(
        '/api/auth/Deposits/Edit',
        {
          date: editModalDepositDate,
          check_no: editModalDepositCheckNo,
          particulars: editModalDepositParticulars,
          remarks: editModalDepositRemarks,
          amount: editModalDepositAmount,
        },
        { withCredentials: true },
      );

      if (response.status === 201) {
        setModalEditDeposit(false);
        toast.success('Edited the deposit entry!');
      }
    } catch (err) {
      if (err && err instanceof AxiosError) {
        toast.error(err.response?.data.message);
      } else if (err && err instanceof Error) {
        console.log('Error: ', err);
      }
    }
  }


  useEffect(() => {
    axios({
      method: 'GET',
      url: '/api/auth/Deposits/Get',
    })
      .then((response: { data: SetStateAction<Deposits[] | null | undefined> }) => {
        setDeposits(response.data);
        console.log(response.data);
      })
      .catch((error: any) => console.error(error));
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Reports" />

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
                    <SelectGroupOne />
                  </div>
                  <div className="w-full xl:w-1/3">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Bank Code
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Bank Code"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                    Find Account
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="p-6.5 my-6 py-1 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark flex flex-wrap items-center gap-4">
          <div className="flex items-center">
            <label className="mb-0 mr-2 block text-black dark:text-white">
              From
            </label>
            <DatePickerOne />
          </div>
          <div className="flex items-center">
            <label className="mb-0 mr-2 block text-black dark:text-white">
              To
            </label>
            <DatePickerOne />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
        <div className="p-6.5 my-6 py-1">
          <Tabs aria-label="Pills" style="pills" className="bg-gray-100 rounded-lg">

            {/* <!-- Deposits Report --> */}

            <Tabs.Item
              active
              title="Deposits"
              className="text-gray-700 px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-primary-500"
            >
              <div className="overflow-x-auto">
                <Table hoverable>
                  <Table.Head>
                    <Table.HeadCell className="p-4">
                      <Checkbox />
                    </Table.HeadCell>
                    <Table.HeadCell>Date</Table.HeadCell>
                    <Table.HeadCell>Check #</Table.HeadCell>
                    <Table.HeadCell>Particular</Table.HeadCell>
                    <Table.HeadCell>Remarks</Table.HeadCell>
                    <Table.HeadCell>Amount</Table.HeadCell>
                    <Table.HeadCell>
                      <span className="sr-only">Edit</span>
                    </Table.HeadCell>
                  </Table.Head>
                  < Table.Body className="divide-y">
                    {DepositReport
                      && DepositReport.map((Deposits, key) => (
                        <Table.Row key={key} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                          <Table.Cell className="p-4">
                            <Checkbox />
                          </Table.Cell>
                          <Table.Cell>date unta</Table.Cell>
                          <Table.Cell>{Deposits.check_no}</Table.Cell>
                          <Table.Cell>{Deposits.particulars}</Table.Cell>
                          <Table.Cell>{Deposits.remarks}</Table.Cell>
                          <Table.Cell>{Deposits.amount}</Table.Cell>
                          <Table.Cell>
                            <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                              onClick={() => {
                                setModalEditDeposit(true);
                                setEditModalDepositUserDate("");
                                setEditModalDepositCheckNo(Deposits.check_no);
                                setEditModalDepositParticulars(Deposits.particulars);
                                setEditModalDepositRemarks(Deposits.remarks);
                                setEditModalDepositAmount(Deposits.amount);
                              }}>
                              Edit
                            </a>
                            <Modal
                              show={openModalEditDeposit}
                              size="md"
                              popup
                              onClose={() => setModalEditDeposit(false)}
                              initialFocus={userInputRefInputRef}
                            >
                              <div className="fixed inset-0 flex items-center justify-center p-1">
                                <div className="w-full max-w-md mx-auto bg-white rounded-lg border shadow-md sm:p-1 dark:bg-gray-800 dark:border-gray-700">
                                  <Modal.Header />
                                  <Modal.Body>
                                    <div className="space-y-2">
                                      <h3 className="text-xl font-medium text-gray-900 dark:text-white">Edit Deposit</h3>
                                      <div>
                                        <div className="mb-2 block">
                                          <Label htmlFor="date" value="Date" />
                                        </div>
                                        <TextInput id="date" placeholder="date unta" required />
                                      </div>
                                      <div>
                                        <div className="mb-2 block">
                                          <Label htmlFor="check" value="Check#" />
                                        </div>
                                        <TextInput id="check_no" placeholder={editModalDepositCheckNo?.toString()} required />
                                      </div>
                                      <div>
                                        <div className="mb-2 block">
                                          <Label htmlFor="particulars" value="Particulars" />
                                        </div>
                                        <TextInput id="particulars" placeholder={editModalDepositParticulars} required />
                                      </div>
                                      <div>
                                        <div className="mb-2 block">
                                          <Label htmlFor="remarks" value="Remarks" />
                                        </div>
                                        <TextInput id="remarks" placeholder={editModalDepositRemarks} required />
                                      </div>
                                      <div>
                                        <div className="mb-2 block">
                                          <Label htmlFor="amount" value="Amount" />
                                        </div>
                                        <TextInput id="amount" placeholder={editModalDepositAmount?.toString()} required />
                                      </div>
                                      <div className="flex justify-end gap-3">
                                        <button className="flex justify-center rounded bg-primary p-3 font-small text-white hover:bg-opacity-90">
                                          Edit Entry
                                        </button>
                                        <button className="flex justify-center rounded bg-red-600 p-3 font-small text-white hover:bg-red-700">
                                          Delete Entry
                                        </button>
                                      </div>
                                    </div>
                                  </Modal.Body>
                                </div>
                              </div>
                            </Modal>
                          </Table.Cell>
                        </Table.Row>
                      ))}

                    {/* <!-- Deposits Total --> */}

                    <Table.Row className="font-bold">
                      <Table.Cell></Table.Cell>
                      <Table.Cell></Table.Cell>
                      <Table.Cell></Table.Cell>
                      <Table.Cell>Total</Table.Cell>
                      <Table.Cell>Pesos</Table.Cell>
                      <Table.Cell></Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </div>

              <div className="p-4 flex justify-end">
                <Button className="bg-primary text-white rounded-lg px-2px py-2px hover:bg-primary-dark hover:bg-opacity-90">
                  Generate Report
                </Button>
              </div>
            </Tabs.Item>

            {/* <!-- Withdraws Report --> */}

            <Tabs.Item
              title="Withdraws"
              className="text-gray-700 px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-primary-500"
            >
              <div className="overflow-x-auto">
                <Table hoverable>
                  <Table.Head>
                    <Table.HeadCell className="p-4">
                      <Checkbox />
                    </Table.HeadCell>
                    <Table.HeadCell>Date</Table.HeadCell>
                    <Table.HeadCell>Check #</Table.HeadCell>
                    <Table.HeadCell>Invoice #</Table.HeadCell>
                    <Table.HeadCell>Payee</Table.HeadCell>
                    <Table.HeadCell>Remarks</Table.HeadCell>
                    <Table.HeadCell>Amount</Table.HeadCell>
                    <Table.HeadCell>
                      <span className="sr-only">Edit</span>
                    </Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y">
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell className="p-4">
                        <Checkbox />
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {'Apple MacBook Pro 17"'}
                      </Table.Cell>
                      <Table.Cell>Sliver</Table.Cell>
                      <Table.Cell>Laptop</Table.Cell>
                      <Table.Cell>Laptop</Table.Cell>
                      <Table.Cell>Laptop</Table.Cell>
                      <Table.Cell>$2999</Table.Cell>
                      <Table.Cell>
                        <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                          Edit
                        </a>
                      </Table.Cell>
                    </Table.Row>

                    {/* <!-- Withdraws Total --> */}

                    <Table.Row className="font-bold">
                      <Table.Cell></Table.Cell>
                      <Table.Cell></Table.Cell>
                      <Table.Cell></Table.Cell>
                      <Table.Cell></Table.Cell>
                      <Table.Cell></Table.Cell>
                      <Table.Cell>Total</Table.Cell>
                      <Table.Cell>Pesos</Table.Cell>
                      <Table.Cell></Table.Cell>
                    </Table.Row>


                  </Table.Body>
                </Table>
              </div>

              <div className="p-4 flex justify-end">
                <Button className="bg-primary text-white rounded-lg px-2px py-2px hover:bg-primary-dark hover:bg-opacity-90">
                  Generate Report
                </Button>
              </div>
            </Tabs.Item>

            {/* <!-- Deposits and Withdraws Report --> */}

            <Tabs.Item
              title="Deposits & Withdraws"
              className="text-gray-700 px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-primary-500"
            >
              <div className="flex justify-between gap-4">
                {/* Deposits Table */}
                <div className="w-1/2">
                  <div className="mb-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Deposits</h4>
                  </div>
                  <div className="overflow-x-auto">
                    <Table hoverable>
                      <Table.Head>
                        <Table.HeadCell>Date</Table.HeadCell>
                        <Table.HeadCell>Amount</Table.HeadCell>
                      </Table.Head>
                      <Table.Body className="divide-y">
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {'Apple MacBook Pro 17"'}
                          </Table.Cell>
                          <Table.Cell>$2999</Table.Cell>
                        </Table.Row>
                        {/* Add additional rows as necessary */}
                      </Table.Body>
                    </Table>
                  </div>
                </div>

                {/* Withdraws Table */}
                <div className="w-1/2">
                  <div className="mb-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Withdraws</h4>
                  </div>
                  <div className="overflow-x-auto">
                    <Table hoverable>
                      <Table.Head>
                        <Table.HeadCell>Date</Table.HeadCell>
                        <Table.HeadCell>Amount</Table.HeadCell>
                      </Table.Head>
                      <Table.Body className="divide-y">
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            Microsoft Surface Pro
                          </Table.Cell>
                          <Table.Cell>$1999</Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </Table>
                  </div>
                </div>
              </div>

              <div className="p-4 flex justify-end">
                <Button className="bg-primary text-white rounded-lg px-2px py-2px hover:bg-primary-dark hover:bg-opacity-90">
                  Generate Report
                </Button>
              </div>
            </Tabs.Item>


          </Tabs>

        </div>
      </div>

    </DefaultLayout >
  );
};

export default Reports;