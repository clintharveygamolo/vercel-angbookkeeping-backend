import React from 'react'
import './LogInForm.css'
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import Anglogo from '/src/image/AngBookkeeping.png'
import '../App.css'

const LogInForm = () => {
    return (
        <div classname='outsidewrapper'>
            <img src={Anglogo} alt="Logo" className="AngBookkeepingLogo" />
            <div className='wrapper'>
                <form action="">
                    <h1>
                        Login
                    </h1>
                    <div className="input-box">
                        <input type="text" placeholder='Username' required />
                        <FaUser className='icon' />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder='Password' required />
                        <FaLock className='icon' />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}

export default LogInForm

