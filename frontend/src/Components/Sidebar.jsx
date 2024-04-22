import React from "react";
import { BiHome, BiBookAlt, BiMessage, BiSolidReport, BiHelpCircle, BiMoneyWithdraw } from "react-icons/bi";
import { MdAccountBalance } from "react-icons/md";
import { TbReportMoney } from "react-icons/tb";

import './Sidebar.css';

const Sidebar = () => {
    return <div className="menu">
        <div className="logo">
            <BiBookAlt className="logo-icon" />
            <h2>
                <span>Bookkeeping</span><br />
                <span>System</span>
            </h2>
        </div>

        <div className="menu--list">
            <div className="item-label">
                Home
            </div>
            <a href="#" className="item">
                <BiHome className="icon" />
                Dashboard
            </a>
            <a href="#" className="item">
                <MdAccountBalance />
                Accounts
            </a>
            <div className="item-label">
                Transactions
            </div>
            <a href="#" className="item">
                <BiSolidReport className="icon" />
                Deposits
            </a>
            <a href="#" className="item">
                <BiMoneyWithdraw className="icon" />
                Withdrawals
            </a>
            <div className="item-label">
                Reports
            </div>
            <a href="#" className="item">
                <TbReportMoney className="icon" />
                Reports
            </a>
        </div>
    </div>
}

export default Sidebar