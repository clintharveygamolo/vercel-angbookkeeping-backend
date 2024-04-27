import React, { useState } from 'react'
import '../Log-in/LogInForm.css';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import Anglogo from '../image/AngBookkeeping.png';
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
        <div className='outsidewrapper'>
            <img src={Anglogo} alt="Logo" className="AngBookkeepingLogo" />
            <div className='wrapper'>
                <form action="">
                    <h1>
                        Login
                    </h1>
                    <div className="input-box">
                        <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder='User ID' required />
                        <FaUser className='icon' />
                    </div>
                    <div className="input-box">
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
                        <FaLock className='icon' />
                    </div>
                    //<button onClick={handleLogin} type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}

export default LogInForm;

