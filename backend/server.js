import express from "express";
import { injectInitialData } from "./util/dbInject.js";
import authRoutes from "./routes/authRoute.js";
import createUserRoute from "./routes/createUserRoute.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import getUserRoute from "./routes/getUserRoute.js";
import editUserRoute from "./routes/editAccountsRoute.js";
import deleteUserRoute from "./routes/deleteUserRoute.js";
import setAssociations from "./util/dbAssociations.js";
import createCompanyRoute from "./routes/createCompanyRoute.js";
import createBankRoute from "./routes/createBankRoute.js";
import createAccountRoute from "./routes/accountsRoute.js";
import getBankRoute from "./routes/getBankRoute.js";
import getCompanyRoute from "./routes/getCompanyRoute.js";
import filterRoute from "./routes/filterRoute.js";

import depositsRoute from "./routes/depositsRoute.js";
import withdrawsRoute from "./routes/withdrawsRoute.js";

const app = express();
app.get("/", (req, res) => {
  res.send("Enter valid gateway");
});

// Middleware
app.use(
  cors({
    origin: "https://vercel-angbookkeeping-frontend.onrender.com",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

setAssociations();
injectInitialData();

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

app.use("/api/auth/Deposits", depositsRoute);
app.use("/api/auth/Withdrawals", withdrawsRoute);
app.use("/api", filterRoute);

// Routes
const port = 9000;

try {
  app.listen(port);
  console.log("Listening on port ", port);
} catch (error) {
  console.error(error);
}

export default app;
