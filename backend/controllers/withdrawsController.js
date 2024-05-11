import Withdraws from '../models/withdrawsModel.js';
import User from '../models/userModel.js';

export async function createWithdraws(req, res) {
    try {
        await Withdraws.create({
            withdraw_id: req.body.withdraw_id,
            date: req.body.date,
            payee: req.body.payee,
            check_no: req.body.check_no,
            invoice_no: req.body.invoice_no,
            amount: req.body.amount,
            remarks: req.body.remarks
        });

        res.status(201).json("Withdrawal Entry Successfully Created.");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occured while creating the entry."});
    }
}

export async function editWithdraws(req, res) {
    try {
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
            withdraw_id: req.body.withdraw_id,
            date: req.body.date,
            payee: req.body.payee,
            check_no: req.body.check_no,
            invoice_no: req.body.invoice_no,
            amount: req.body.amount,
            remarks: req.body.remarks
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