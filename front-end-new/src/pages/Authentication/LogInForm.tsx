import React, { useEffect, useState } from 'react';
import { FaUser, FaLock } from "react-icons/fa";
import Anglogo from '../../images/AngBookkeeping.png';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { ToastContainer, ToastContentProps, toast } from 'react-toastify';

const LogInForm: React.FC = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleError = (err: String | Error | any) => {
        toast.error(err, {
            position: "bottom-right"
        });
    }
    
    const handleSuccess = (msg: String) => {
        toast.success(msg, {
            position: "bottom-right"
        });
    }

    const handleLogin = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:9000/api/auth/login', {
                user_id: userId,
                password: password
            },
            { withCredentials: true }
            );
            if (response.status === 200) {
                setIsLoggedIn(true);
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    if (isLoggedIn) {
        return <Navigate to="/dashboard" />
    }

    return ( 
        <div className='flex flex-col justify-center items-center h-screen bg-gray-800'>
            <img src={Anglogo} alt="Logo" className="mb-12 w-80" />
            <div className='bg-[#1F2937] text-white rounded-lg p-10 shadow-[0_0_10px_rgba(0,0,0,0.6)] w-full max-w-[420px]'>
                <form>
                    <h1 className='text-3xl font-bold text-center mb-6'>
                        Login
                    </h1>
                    <div className="relative mb-6">
                        <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder='User ID' required className="w-full h-12 pl-5 pr-16 rounded-full bg-transparent border-2 border-gray-400 text-white placeholder-white focus:outline-none" />
                        <FaUser className='absolute right-5 top-1/2 transform -translate-y-1/2 text-white text-lg' />
                    </div>
                    <div className="relative mb-8">
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required className="w-full h-12 pl-5 pr-16 rounded-full bg-transparent border-2 border-gray-400 text-white placeholder-white focus:outline-none" />
                        <FaLock className='absolute right-5 top-1/2 transform -translate-y-1/2 text-white text-lg' />
                    </div>
                    <button type="submit" onClick={handleLogin} className='w-full h-12 bg-white text-black font-bold rounded-full shadow-md hover:bg-gray-100'>Login</button>
                </form>
            </div>
        </div>
    );
}

export default LogInForm;
