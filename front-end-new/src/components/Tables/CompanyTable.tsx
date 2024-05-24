import './table.css';
import { Table } from 'flowbite-react';
import { useRef, useState, useEffect, SetStateAction } from 'react';
import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../../api/axiosconfig';
import { AxiosError } from 'axios';

export type Company = {
  companyName: string;
};

export function CompaniesTable() {
  const [openModal, setOpenModal] = useState(false);
  const userInputRefInputRef = useRef<HTMLInputElement>(null);
  const [companyName, setCompanyName] = useState<Company[] | null>();
  const [newCompanyName, setNewCompanyName] = useState<string>('');

  const createCompany = async () => {
    try {
      const response = await axios.post(
        'api/company/createCompany',
        {
          companyName: newCompanyName,
        },
        { withCredentials: true },
      );
      if (response.status === 201) {
        toast.success(`Created company: ${newCompanyName}`);
        setOpenModal(false);
      }
    } catch (err) {
      if (err && err instanceof AxiosError) {
        toast.error(err.response?.data.message);
      } else if (err && err instanceof Error) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/api/company/getCompany',
    })
      .then(
        (response: { data: SetStateAction<Company[] | null | undefined> }) => {
          setCompanyName(response.data);
          console.log(response.data);
        },
      )
      .catch((error: any) => console.error(error));
  }, []);

  return (
    <div className="overflow-x-auto rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-black dark:text-white">
            Companies
          </h2>
          <Button
            className="bg-primary text-white rounded-lg px-4 py-2 hover:bg-primary-dark hover:bg-opacity-90"
            onClick={() => setOpenModal(true)}
          >
            Add Company
          </Button>
        </div>
        <Modal
          show={openModal}
          size="md"
          popup
          onClose={() => setOpenModal(false)}
          initialFocus={userInputRefInputRef}
        >
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <div className="w-full max-w-md mx-auto bg-white rounded-lg border shadow-md sm:p-2 dark:bg-gray-800 dark:border-gray-700">
              <Modal.Header />
              <Modal.Body>
                <div className="space-y-2">
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                    Add Company
                  </h3>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="Company" value="Company" />
                    </div>
                    <TextInput
                      id="Company"
                      ref={userInputRefInputRef}
                      value={newCompanyName}
                      onChange={(e: any) => setNewCompanyName(e.target.value)}
                      placeholder="Company"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <Button>Log in to your account</Button>
                  </div>
                  <div className="flex justify-end gap-3">
                    <button className="flex justify-center rounded bg-primary p-3 font-small  text-gray hover:bg-opacity-90">
                      Delete Company
                    </button>
                    <button className="flex justify-center rounded bg-primary p-3 font-small text-gray hover:bg-opacity-90">
                      Edit Company
                    </button>
                    <button
                      onClick={createCompany}
                      className="flex justify-center rounded bg-primary p-3 font-small text-gray hover:bg-opacity-90"
                    >
                      Create Company
                    </button>
                  </div>
                </div>
              </Modal.Body>
            </div>
          </div>
        </Modal>
      </div>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Company List</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {companyName &&
            companyName.map((company) => (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {company.companyName}
                </Table.Cell>
                <Table.Cell>
                  <a
                    href="#"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Edit
                  </a>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
      <ToastContainer />
    </div>
  );
}
export default CompaniesTable;
