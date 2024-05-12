import React, { useState } from 'react';
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import Anglogo from '../../images/AngBookkeeping.png';
import axios from '../../api/axiosconfig.ts';
import { AxiosError } from 'axios';

const LogInForm: React.FC = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const signIn = useSignIn();

<<<<<<< HEAD
    const onSubmit = async (e: { preventDefault: () => void}) => {
=======
    const notify = () => {
        toast.success("Success!", {
            position: "top-center"
        });


        toast.error("Error!", {
            position: "top-center"
        });
    }

    const onSubmit = async (e: { preventDefault: () => void }) => {
>>>>>>> development
        e.preventDefault();
        console.log("Values", e);
        setError("");
        try {
            const response = await axios.post('/api/auth/login', {
                user_id: userId,
                password: password
            },
                { withCredentials: true }
            );
            if (response.status === 200) {
                signIn({
                    auth: {
                        token: response.data.accessToken,
                        type: "Bearer",
                    },
                    // refresh: response.data.refreshToken,
                    userState: {
                        user_id: userId,
                        name: response.data.name,
                        role: response.data.role
<<<<<<< HEAD
=======

>>>>>>> development
                    },
                });
                navigate('/');
            }
        } catch (err) {
            if (err && err instanceof AxiosError) {
                setError(err.response?.data.message);
                toast.error(err.response?.data.message, {
                    position: 'top-right'
                });
            } else if (err && err instanceof Error) setError(err.message);
            console.log("Error: ", err);
        }
    };

    return (
        <>
            <div className='flex flex-col justify-center items-center h-screen bg-gray-800'>
                <img src={Anglogo} alt="Logo" className="mb-12 w-80" />
                <div className='bg-[#1F2937] text-white rounded-lg p-10 shadow-[0_0_10px_rgba(0,0,0,0.6)] w-full max-w-[420px]'>
                    <form>
                        <h1 className='text-3xl font-bold text-center mb-6'>
                            Login
                        </h1>
                        <div className="relative mb-6">
                            <input type="text" value={userId} onChange={(e: any) => setUserId(e.target.value)} placeholder='User ID' required className="w-full h-12 pl-5 pr-16 rounded-full bg-transparent border-2 border-gray-400 text-white placeholder-white focus:outline-none" />
                            <FaUser className='absolute right-5 top-1/2 transform -translate-y-1/2 text-white text-lg' />
                        </div>
                        <div className="relative mb-8">
                            <input type="password" value={password} onChange={(e: any) => setPassword(e.target.value)} placeholder='Password' required className="w-full h-12 pl-5 pr-16 rounded-full bg-transparent border-2 border-gray-400 text-white placeholder-white focus:outline-none" />
                            <FaLock className='absolute right-5 top-1/2 transform -translate-y-1/2 text-white text-lg' />
                        </div>
                        <button type="submit" onClick={onSubmit} className='w-full h-12 bg-white text-black font-bold rounded-full shadow-md hover:bg-gray-100'>Login</button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default LogInForm;
