import Withdraws from '../models/withdrawsModel.js';
import User from '../models/userModel.js';
import { parse } from 'date-fns';
import { Op } from 'sequelize';

export async function createWithdraws(req, res) {
    /*try {
        const { withdraw_id, date, check_no, voucher_no, payee, remarks, amount } = req.body;

        const parsedDate = parse(date, 'MM/dd/yyyy', new Date());

        const existingCheck = await Withdraws.findOne({ where: { check_no } });
        if (existingCheck) {
            return res.status(409).json({ message: "Check Number already exists" });
        }

        const existingVouch = await Withdraws.findOne({ where: { voucher_no } });
        if (existingVouch) {
            return res.status(409).json({ message: "Voucher Number already exists" });
        }

        await Withdraws.create({

            withdraw_id,
            date: parsedDate,
            check_no,
            voucher_no,
            payee,
            remarks,
            amount,
        });

        res.status(201).json("Withdrawal Entry Successfully Created.");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occured while creating the entry." });
    }*/

    try {
        const { withdraw_id, date, check_no, voucher_no, payee, remarks, amount, account_id } = req.body;

        const parsedDate = parse(date, 'MM/dd/yyyy', new Date());

        const [withdraw, created] = await Withdraws.findOrCreate({
            where: { account_id, check_no },
            defaults: {
                withdraw_id,
                date: parsedDate,
                voucher_no,
                payee,
                remarks,
                amount
            }
        });

        if (!created) {
            return res.status(409).json({ message: "Check Number already exists for this Account!" });
        }

        res.status(201).json("Deposit Entry Successfully Created.");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occured while creating the entry." });
    }
}

export async function editWithdraws(req, res) {
    try {
        const { withdraw_id, date, check_no, voucher_no, payee, remarks, amount } = req.body;
        const parsedDate = parse(date, 'MM/dd/yyyy', new Date());
        const currentUser = await User.findByPk(req.body.user_id);

        const withdraws = await Withdraws.findOne({ where: { withdraw_id: withdraw_id } });

        if (currentUser.role !== 'Admin') {
            return res.status(403).json({ error: "Forbidden: Only admin users can edit withdrawal entries." });
        }

        if (!withdraws) {
            return res.status(401).json({ message: "Updated failed, withdrawal entry not found." });
        }
        //Check for existing check_no in other entries
        const existingCheckNo = await Withdraws.findOne({
            where: { check_no: check_no, withdraw_id: { [Op.ne]: withdraw_id } }
        });

        if (existingCheckNo) {
            return res.status(409).json({ message: "Check number already exists!" });
        }
        // Check for existing voucher_no in other entries
        const existingVoucherNo = await Withdraws.findOne({
            where: { voucher_no: voucher_no, withdraw_id: { [Op.ne]: withdraw_id } }
        });

        if (existingVoucherNo) {
            return res.status(409).json({ message: "Voucher number already exists!" });
        }

        await Withdraws.update({
            date: parsedDate,
            check_no: check_no,
            voucher_no: voucher_no,
            payee: payee,
            remarks: remarks,
            amount: amount
        },
            {
                where: {
                    withdraw_id: withdraw_id
                }
            }
        );

        res.status(201).json("Withdrawal Entry Successfully Edited.");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occured while updating the entry." });
    }
}

//delete withdraws
/*
export async function deleteWithdraws(req, res) {
    try {
        const currentUser = await User.findByPk(req.body.user_id);

        const { withdraw_id } = req.body;

        const withdraws = await Withdraws.findOne({ where: { withdraw_id: withdraw_id } });

        if (currentUser.role !== 'Admin') {
            return res.status(403).json({ error: "Forbidden: Only admin users can delete withdrawal entries." });
        }

        if (!withdraws) {
            return res.status(401).json({ message: "Deletion failed, withdraw entry not found." });
        }

        await Withdraws.destroy({
            where: {
                withdraw_id: req.body.withdraw_id
            }
        }
        );

        res.status(201).json("Withdrawal Entry Successfully Deleted.");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occured while deleting the entry." });
    }
}
*/

export async function deleteWithdraws(req, res) {
    try {
        const { user_id } = req.body; // Extract user_id from request body
        const { withdraw_id } = req.params; // Extract withdraw_id from URL parameters

        // Log the received user_id and withdraw_id
        console.log(`Received user_id: ${user_id}, withdraw_id: ${withdraw_id}`);

        const currentUser = await User.findByPk(user_id);

        // Log currentUser
        console.log(`Current user: ${JSON.stringify(currentUser)}`);

        if (!currentUser) {
            return res.status(404).json({ error: "User not found." });
        }

        if (currentUser.role !== 'Admin') {
            return res.status(403).json({ error: "Forbidden: Only admin users can delete withdrawal entries." });
        }

        const withdraws = await Withdraws.findOne({ where: { withdraw_id } });

        // Log withdraws
        console.log(`Withdraw entry found: ${JSON.stringify(withdraws)}`);

        if (!withdraws) {
            return res.status(404).json({ message: "Deletion failed, withdrawal entry not found." });
        }

        await Withdraws.destroy({ where: { withdraw_id } });

        res.status(200).json("Withdrawal Entry Successfully Deleted.");
    } catch (error) {
        console.error("Error occurred while deleting withdrawal entry:", error);
        res.status(500).json({ error: "An error occurred while deleting the entry." });
    }
}


//this is the withdraw get function.
export async function getWithdraws(req, res) {
    try {
        const withdrawQuery = await Withdraws.findAll({
            attributes: ["withdraw_id", "date", "check_no", "voucher_no", "payee", "remarks", "amount"],
        });
        res.status(200).json(withdrawQuery);
    } catch (error) {
        res.status(400).json({ error: "An error occured while fetching withdrawals!" });
    }
}

export async function getWithdraw(req, res) {
    const [withdraw_id] = req.params.withdraw_id;
    try {
        const withdrawQuery = await User.findByPk(withdraw_id);
        res.status(200).json(withdrawQuery);
    } catch (error) {
        res.status(400).json({ error: "An error occured while fetching withdrawals!" });
    }
}