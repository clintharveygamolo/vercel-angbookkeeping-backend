// 'use client';

import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import CoverOne from '../images/cover/cover-01.png';
import userSix from '../images/user/user-06.png';
import { SetStateAction, useEffect, useState } from 'react';
import axiosConfig from '.././api/axiosconfig.js';
import { AxiosError } from 'axios';

import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { useRef } from 'react';
import SelectGroupTwo from '../components/Forms/SelectGroup/SelectGroupTwo';

import {
  createUserValidationSchema,
  editUserValidationSchema,
} from '.././utils/yupValidationSchemas.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';

export type User = {
  user_id: number;
  name: string;
  password: string;
  role: string;
};

const Profile = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const userInputRefInputRef = useRef<HTMLInputElement>(null);
  const [userAccounts, setUserAccounts] = useState<User[] | null>();
  const auth: any = useAuthUser();

  const [userNameFormValue, setUserNameFormValue] = useState<string>('');
  const [userPasswordFormValue, setUserPasswordFormValue] =
    useState<string>('');
  const [selectedRole, setSelectedRole] = useState<string>('');

  const [userToDelete, setUserToDelete] = useState<number>(0);

  const [editModalUserName, setEditModalUserName] = useState<string>('');
  const [editModalRole, setEditModalRole] = useState<string>('');

  const validateCreateUserForm = async (values: {
    name: string;
    password: string;
    role: string;
  }) => {
    try {
      await createUserValidationSchema.validate(values, { abortEarly: false });
      return true;
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((err) => {
          toast.error(err.message, {
            position: 'top-right',
          });
        });
      } else {
        toast.error('An unexpected error occured during validation!');
      }
      return false;
    }
  };

  const validateEditUserForm = async (values: {
    name: string;
    password: string;
    role: string;
  }) => {
    try {
      await editUserValidationSchema.validate(values, { abortEarly: false });
      return true;
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((err) => {
          toast.error(err.message, {
            position: 'top-right',
          });
        });
      } else {
        toast.error('An unexpected error occured during validation!');
      }
      return false;
    }
  };

  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
  };

  const handleRoleChangeEdit = (role: string) => {
    setEditModalRole(role);
  };

  const deleteUserAccount = async (user_id: number) => {
    try {
      // console.log('Attempting to delete user_id:', user_id);
      // console.log('Current auth.user_id:', auth.user_id);
      if (user_id == auth.user_id) {
        toast.error('Cannot delete current user!');
        return;
      }
      const response = await axiosConfig.delete(
        `/api/user/deleteUser/${user_id}`,
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        const updatedUsers = await axiosConfig.get(`/api/get/users`);
        setUserAccounts(updatedUsers.data);
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

  const createUserAccount = async () => {
    const isValid = await validateCreateUserForm({
      name: userNameFormValue,
      password: userPasswordFormValue,
      role: selectedRole,
    });
    if (!isValid) return;
    try {
      await validateCreateUserForm({
        name: userNameFormValue,
        password: userPasswordFormValue,
        role: selectedRole,
      });

      const response = await axiosConfig.post(
        '/api/createUser',
        {
          user_id: auth.user_id,
          name: userNameFormValue,
          password: userPasswordFormValue,
          role: selectedRole,
        },
        { withCredentials: true },
      );

      if (response.status === 201) {
        toast.success('Created a user!');
        const updatedUsers = await axiosConfig.get(`/api/get/users`);
        setUserAccounts(updatedUsers.data);
        setOpenModal(false);
        setUserNameFormValue('');
        setUserPasswordFormValue('');
        setSelectedRole('');
      }
    } catch (err) {
      if (err && err instanceof AxiosError) {
        toast.error(err.response?.data.message);
      } else if (err && err instanceof Error) {
        toast.error('An error occured during validation');
      } else {
        toast.error('An unexpected error occured');
      }
    }
  };

  const editUserAccount = async (user_id: number) => {
    const isValid = await validateEditUserForm({
      name: editModalUserName,
      password: userPasswordFormValue,
      role: editModalRole,
    });
    if (!isValid) return;
    try {
      const response = await axiosConfig.put(
        `/api/user/editUser/${auth.user_id}/${user_id}`,
        {
          name: editModalUserName,
          password: userPasswordFormValue,
          role: editModalRole,
        },
        { withCredentials: true },
      );

      if (response.status === 201) {
        toast.success('Edited a user!');
        const updatedUsers = await axiosConfig.get(`/api/get/users`);
        setUserAccounts(updatedUsers.data);
        setOpenEditModal(false);
      }
    } catch (err) {
      if (err && err instanceof AxiosError) {
        toast.error(err.response?.data.message);
      } else if (err && err instanceof Error) {
        console.log('Error: ', err);
      }
    }
  };

  useEffect(() => {
    axiosConfig({
      method: 'GET',
      url: '/api/get/users',
    })
      .then((response: { data: SetStateAction<User[] | null | undefined> }) => {
        setUserAccounts(response.data);
        console.log(response.data);
      })
      .catch((error: any) => console.error(error));
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Profile" />

      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="relative z-20 h-35 md:h-65">
          <img
            src={CoverOne}
            alt="profile cover"
            className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
          />
        </div>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
            <div className="relative drop-shadow-2">
              <img src={userSix} alt="profile" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
              {auth.name}
            </h3>
            <p className="font-medium">{auth.role}</p>
            <div className="mx-auto max-w-180">
              <h4 className="font-semibold text-black dark:text-white">{}</h4>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Add/Edit Account --> */}

      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <div className="flex items-center justify-between">
          {' '}
          {/* Flex container to align items on the same line */}
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Add/Edit Accounts
          </h4>
          <>
            <Button
              className="bg-primary text-white rounded-lg px-4 py-2 hover:bg-primary-dark hover:bg-opacity-90"
              onClick={() => setOpenModal(true)}
            >
              Create Account
            </Button>
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
                        Create Account
                      </h3>
                      <div>
                        <div className="mb-2 block">
                          <Label htmlFor="name" value="Name" />
                        </div>
                        <TextInput
                          id="name"
                          value={userNameFormValue}
                          ref={userInputRefInputRef}
                          placeholder="Enter name"
                          onChange={(e: any) =>
                            setUserNameFormValue(e.target.value)
                          }
                          type="text"
                          required
                        />
                      </div>
                      <div>
                        <div className="mb-2 block">
                          <Label htmlFor="password" value="Password" />
                        </div>
                        <TextInput
                          ref={userInputRefInputRef}
                          id="password"
                          value={userPasswordFormValue}
                          placeholder="Enter password"
                          onChange={(e: any) =>
                            setUserPasswordFormValue(e.target.value)
                          }
                          type="password"
                          required
                        />
                      </div>
                      <div>
                        <div className="w-full">
                          <div className="mb-2 block">
                            <Label htmlFor="role" value="Select Role" />
                          </div>
                          <SelectGroupTwo
                            selectedRole={selectedRole}
                            onRoleChange={handleRoleChange}
                          />
                        </div>
                      </div>
                      <div className="w-full">
                        <Button>Log in to your account</Button>
                      </div>
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => {
                            createUserAccount();
                          }}
                          className="flex justify-center rounded bg-primary p-3 font-small text-gray hover:bg-opacity-90"
                        >
                          Create Account
                        </button>
                      </div>
                    </div>
                  </Modal.Body>
                </div>
              </div>
            </Modal>
          </>
        </div>
      </div>

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  AccountID
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Name
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Privileges
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {userAccounts &&
                userAccounts.map((user, key) => (
                  <tr key={key}>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {user.user_id}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">{user.name}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p
                        className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                          user.role === 'Employee'
                            ? 'bg-success text-success'
                            : user.role === 'Viewer'
                            ? 'bg-danger text-danger'
                            : 'bg-warning text-warning'
                        }`}
                      >
                        {user.role}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        {/* <!-- View Icon --> */}
                        <button
                          className="hover:text-primary"
                          onClick={() => {
                            setOpenEditModal(true);
                            setUserToDelete(user.user_id);
                            setEditModalUserName(user.name);
                            setEditModalRole(user.role);
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
                        <Modal
                          show={openEditModal}
                          size="md"
                          popup
                          onClose={() => {
                            setOpenEditModal(false);
                            setUserNameFormValue('');
                            setUserPasswordFormValue('');
                            setEditModalUserName('');
                            setEditModalRole('');
                          }}
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
                                  <Label htmlFor="name" value="Name" />
                                </div>
                                <TextInput
                                  id="name"
                                  type="text"
                                  ref={userInputRefInputRef}
                                  onChange={(e: any) =>
                                    setEditModalUserName(e.target.value)
                                  }
                                  placeholder={editModalUserName}
                                  required
                                />
                              </div>
                              <div>
                                <div className="mb-2 block">
                                  <Label htmlFor="password" value="Password" />
                                </div>
                                <TextInput
                                  id="password"
                                  type="password"
                                  onChange={(e: any) =>
                                    setUserPasswordFormValue(e.target.value)
                                  }
                                  placeholder="Enter new password"
                                  required
                                />
                              </div>
                              <div>
                                <div className="w-full">
                                  <div className="mb-2 block">
                                    <Label htmlFor="role" value="Select Role" />
                                  </div>
                                  <SelectGroupTwo
                                    selectedRole={editModalRole}
                                    onRoleChange={handleRoleChangeEdit}
                                  />
                                </div>
                              </div>
                              <div className="flex justify-end gap-3">
                                <button
                                  onClick={() => editUserAccount(userToDelete)}
                                  className="flex justify-center rounded bg-primary p-3 font-small text-gray hover:bg-opacity-90"
                                >
                                  Edit Account
                                </button>
                              </div>
                            </div>
                          </Modal.Body>
                        </Modal>

                        {/* <!-- Delete Icon --> */}
                        <button
                          className="hover:text-primary"
                          onClick={() => {
                            setUserToDelete(user.user_id);
                            setOpenDeleteModal(true);
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
                              <p>
                                `Are you sure you want to delete this account?`
                              </p>
                              <Button
                                className="bg-red-700 text-white rounded-lg px-1 py-1 hover:bg-primary-dark hover:bg-opacity-90"
                                onClick={() => deleteUserAccount(userToDelete)}
                              >
                                Confirm Delete
                              </Button>
                            </div>
                          </Modal.Body>
                        </Modal>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer autoClose={2500} />
    </DefaultLayout>
  );
};

export default Profile;
