import express from "express";
import sequelize from "./util/database.js";
import User from "./models/userModel.js";
import authRoutes from "./routes/authRoute.js";
import createUserRoute from "./routes/createUserRoute.js";
import bcrypt from "bcrypt";
import cors from "cors";
import cookieParser from "cookie-parser";
import getUserRoute from "./routes/getUserRoute.js";
import editUserRoute from "./routes/editAccountsRoute.js";
// import createCompanyRoute from './routes/createCompanyRoute.js';
import deleteUserRoute from "./routes/deleteUserRoute.js";
import setAssociations from "./util/dbAssociations.js";
import createCompanyRoute from "./routes/createCompanyRoute.js";
import createBankRoute from "./routes/createBankRoute.js";
import createAccountRoute from "./routes/accountsRoute.js";
import getBankRoute from "./routes/getBankRoute.js";
import getCompanyRoute from "./routes/getCompanyRoute.js";
import Bank from "./models/BankModel.js";
import Company from "./models/CompanyModel.js";
import Account from "./models/accountModel.js";
// import refreshTokenRoute from "./routes/refreshTokenRoute.js";
// import Deposit from "./models/depositsModel.js";
import filterRoute from "./routes/filterRoute.js"

import depositsRoute from "./routes/depositsRoute.js";
import withdrawsRoute from "./routes/withdrawsRoute.js";
import Deposit from "./models/depositsModel.js";
import Withdraw from "./models/withdrawsModel.js";

const app = express();
app.get("/", (req, res) => {
  res.send("Enter valid gateway");
});

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

setAssociations();

app.use("/api/auth", authRoutes);
app.use("/api/get", getUserRoute);
app.use("/api", createUserRoute);
app.use("/api/user", editUserRoute);
app.use("/api/user", deleteUserRoute);
app.use("/api/bank", getBankRoute);
app.use("/api/bank", createBankRoute);
app.use("/api/company", getCompanyRoute);
app.use("/api/company", createCompanyRoute);
app.use("/api/account", createAccountRoute);

app.use('/api/auth/Deposits', depositsRoute);
app.use('/api/auth/Withdrawals', withdrawsRoute);

//app.use('/api/transactions/', filterRoute);
//for filter route
app.use("/api", filterRoute);

// Routes
const port = 9000;

try {
  await sequelize.sync({ force: true });

  // USERS
  const adminPass = await bcrypt.hash("adminpass", 12);
  await User.create({
    name: "Clint Harvey Gamolo",
    password: adminPass,
    role: "Admin",
  });
  const userPass = await bcrypt.hash("userpass", 12);
  await User.create({
    name: "Troy Red Demafeliz",
    password: userPass,
    role: "Viewer",
  });

  const employeePass = await bcrypt.hash("employeepass", 12);
  await User.create({
    name: "Stephen Dave Ang",
    password: employeePass,
    role: "Employee",
  });

  const viewerPass = await bcrypt.hash("viewerpass", 12);
  await User.create({
    name: "Din Shane Magallanes",
    password: viewerPass,
    role: "Viewer",
  });

  const troyPass = await bcrypt.hash("troypass", 12);
  await User.create({
    name: "Adriane Troy Roa",
    password: troyPass,
    role: "Employee",
  });

  await Bank.create({
    bank_name: "BDO",
  });
  await Bank.create({
    bank_name: "BPI",
  });
  await Bank.create({
    bank_name: "SB",
  });
  await Bank.create({
    bank_name: "BANKWAYS",
  });

  await Company.create({
    companyName: "Ang Architecture",
  });
  await Company.create({
    companyName: "Gamolo Construction Services",
  });
  await Company.create({
    companyName: "Din's Car Rental Services",
  });
  await Company.create({
    companyName: "Roa Hotels Inc.",
  });

  await Account.create({
    account_number: 1234567,
    bank_code: "BDO1",
    company_id: 1,
    bank_id: 1,
  });

  await Account.create({
    account_number: 7654321,
    bank_code: "BDO2",
    company_id: 1,
    bank_id: 1,
  });

  await Account.create({
    account_number: 2345234,
    bank_code: "BPI1",
    company_id: 2,
    bank_id: 2,
  });

  await Account.create({
    account_number: 983514,
    bank_code: "BANKWAYS1",
    company_id: 3,
    bank_id: 4,
  });

  //Transactions

  await Deposit.create({
    date: "12/13/2024",
    check_no: 1,
    particulars: "Din Shane Magallanes",
    remarks: "Sample remark",
    amount: 100,
    account_id: 1,
  })

  await Deposit.create({
    date: "12/13/2024",
    check_no: 2,
    particulars: "Din Shane Taclob",
    remarks: "Remark",
    amount: 10000,
    account_id: 1,
  })

  await Deposit.create({
    date: "12/13/2022",
    check_no: 3,
    particulars: "Randell San",
    remarks: "Pisot",
    amount: 100,
    account_id: 4,
  })

  await Deposit.create({
    date: "12/13/2023",
    check_no: 12,
    particulars: "ClintStone",
    remarks: "Guns",
    amount: 1010,
    account_id: 3,
  })

  await Withdraw.create({
    date: "11/13/2024",
    check_no: 1,
    voucher_no: 1,
    payee: "Din",
    amount: 13000,
    account_id: 1,
  })

  await Withdraw.create({
    date: "11/11/2024",
    check_no: 12,
    voucher_no: 31,
    payee: "Stepheniga",
    amount: 696969,
    account_id: 2,
  })

  app.listen(port);
  console.log("Listening on port ", port);
} catch (error) {
  console.error(error);
}

export default app;
