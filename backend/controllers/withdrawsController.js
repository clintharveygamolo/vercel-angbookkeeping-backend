import Withdraws from '../models/withdrawsModel.js';
import User from '../models/userModel.js';
import { parse } from 'date-fns';

export async function createWithdraws(req, res) {
    try {
        const parsedDate = parse(req.body.date, 'MM/dd/yyyy', new Date());
        await Withdraws.create({
            withdraw_id: req.body.withdraw_id,
            date: parsedDate,
            check_no: req.body.check_no,
            voucher_no: req.body.voucher_no,
            payee: req.body.payee,
            remarks: req.body.remarks,
            amount: req.body.amount
        });

        res.status(201).json("Withdrawal Entry Successfully Created.");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occured while creating the entry." });
    }
}

export async function editWithdraws(req, res) {
    try {
        const parsedDate = parse(req.body.date, 'MM/dd/yyyy', new Date());
        const currentUser = await User.findByPk(req.body.user_id);

        const { withdraw_id } = req.body;

        const withdraws = await Withdraws.findOne({ where: { withdraw_id: withdraw_id } });

        if (currentUser.role !== 'Admin') {
            return res.status(403).json({ error: "Forbidden: Only admin users can edit withdrawal entries." });
        }

        if (!withdraws) {
            return res.status(401).json({ message: "Updated failed, withdrawal entry not found." });
        }

        await Withdraws.update({
            date: parsedDate,
            check_no: req.body.check_no,
            voucher_no: req.body.voucher_no,
            payee: req.body.payee,
            remarks: req.body.remarks,
            amount: req.body.amount
        },
            {
                where: {
                    withdraw_id: req.body.withdraw_id
                }
            }
        );

        res.status(201).json("Withdrawal Entry Successfully Edited.");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occured while updating the entry." });
    }
}

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

//this is the withdraw get function.
export async function getWithdraws(req, res) {
    try {
        const withdrawQuery = await Withdraws.findAll({
            attributes: ["withdraw_id", "date", "check_no", "voucher_no", "payee", "remarks", "amount"],
        });
        res.status(200).json(withdrawQuery);
    } catch (error) {
        res.status(400).json({ error: "An error occured while fetching deposits!" });
    }
}

export async function getWithdraw(req, res) {
    const [withdraw_id] = req.params.withdraw_id;
    try {
        const withdrawQuery = await User.findByPk(withdraw_id);
        res.status(200).json(withdrawQuery);
    } catch (error) {
        res.status(400).json({ error: "An error occured while fetching deposits!" });
    }
}