import React from 'react';
import { FaUser, FaLock } from "react-icons/fa";
import Anglogo from '../../images/AngBookkeeping.png';

const LogInForm: React.FC = () => {
    return (
        <div className='flex flex-col justify-center items-center h-screen bg-gray-800'>
            <img src={Anglogo} alt="Logo" className="mb-12 w-80" />
            <div className='bg-[#1F2937] text-white rounded-lg p-10 shadow-[0_0_10px_rgba(0,0,0,0.6)] w-full max-w-[420px]'>
                <form>
                    <h1 className='text-3xl font-bold text-center mb-6'>
                        Login
                    </h1>
                    <div className="relative mb-6">
                        <input type="text" placeholder='User ID' required className="w-full h-12 pl-5 pr-16 rounded-full bg-transparent border-2 border-gray-400 text-white placeholder-white focus:outline-none" />
                        <FaUser className='absolute right-5 top-1/2 transform -translate-y-1/2 text-white text-lg' />
                    </div>
                    <div className="relative mb-8">
                        <input type="password" placeholder='Password' required className="w-full h-12 pl-5 pr-16 rounded-full bg-transparent border-2 border-gray-400 text-white placeholder-white focus:outline-none" />
                        <FaLock className='absolute right-5 top-1/2 transform -translate-y-1/2 text-white text-lg' />
                    </div>
                    <button type="submit" className='w-full h-12 bg-white text-black font-bold rounded-full shadow-md hover:bg-gray-100'>Login</button>
                </form>
            </div>
        </div>
    );
}

export default LogInForm;
