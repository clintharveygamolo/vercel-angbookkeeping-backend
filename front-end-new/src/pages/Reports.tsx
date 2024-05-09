import React from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import SelectGroupOne from '../components/Forms/SelectGroup/SelectGroupOne';

import { Tabs } from "flowbite-react";

const Reports: React.FC = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Reports" />

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
                  <button className="flex justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                    Delete Account
                  </button>
                  <button className="flex justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                    Edit Account
                  </button>
                  <button className="flex justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                    Create Account
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="p-6.5 my-6 py-1 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h2 className="text-3xl font-bold text-black dark:text-white">
            Banks
          </h2>
        </div>
        <div className="p-6.5 my-6 py-1">
          <Tabs aria-label="Pills" style="pills">
            <Tabs.Item active title="Deposits">
              <p className="text-sm text-gray-500 dark:text-gray-400">Deposits</p>
            </Tabs.Item>
            <Tabs.Item title="Withdraws">
              <p className="text-sm text-gray-500 dark:text-gray-400">Withdraws</p>
            </Tabs.Item>
            <Tabs.Item title="Deposits & Withdraws">
              <p className="text-sm text-gray-500 dark:text-gray-400">Both</p>
            </Tabs.Item>
          </Tabs>
        </div>
      </div>

    </DefaultLayout>
  );
};

export default Reports;
