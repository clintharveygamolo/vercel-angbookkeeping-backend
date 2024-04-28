import React, { useState } from 'react'

import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

//import axios from 'axios';
import { Navigate } from 'react-router-dom';

const LogInForm = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    //const handleLogin = async (e) => {
    //e.preventDefault();
    //try {
    //   const response = await axios.post('http://localhost:9000/api/auth/login', {
    //     user_id: userId,
    //    password: password
    //});
    //if (response.status === 200) {
    //  setIsLoggedIn(true);
    // }
    //} catch (error) {
    //  console.error("Error: ", error);
    //}
    //};

    //if (isLoggedIn) {
    //  return <Navigate to="/dashboard" />
    //}

    return (
        <div className='flex justify-center'>
            <img src={Anglogo} alt="Logo" className="block mx-auto w-88 h-auto mb-5" />
            <div className='w-105 bg-gray-800 text-white rounded-lg p-5 shadow-lg'>
                <form>
                    <h1 className='text-4xl font-bold text-center'>
                        Login
                    </h1>
                    <div className="relative w-full h-12 my-7">
                        <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder='User ID' required className='w-full h-full bg-transparent border-none outline-none border-gray-200 rounded-full text-white px-11 py-5 placeholder-white' />
                        <FaUser className='absolute right-5 top-1/2 transform -translate-y-1/2 text-white text-lg' />
                    </div>
                    <div className="relative w-full h-12 my-7">
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required className='w-full h-full bg-transparent border-none outline-none border-gray-200 rounded-full text-white px-11 py-5 placeholder-white' />
                        <FaLock className='absolute right-5 top-1/2 transform -translate-y-1/2 text-white text-lg' />
                    </div>
                    <button type="submit" className='w-full h-11 bg-white border-none outline-none rounded-full shadow-md cursor-pointer text-lg text-gray-800 font-bold my-5'>
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default LogInForm;

