import Deposits from '../models/depositsModel.js';
import User from '../models/userModel.js';
import { parse } from 'date-fns';
//this is the deposit creation function.
export async function createDeposits(req, res) {
    try {
        const parsedDate = parse(req.body.date, 'MM/dd/yyyy', new Date());
        await Deposits.create({
            deposit_id: req.body.deposit_id,
            date: parsedDate,
            check_no: req.body.check_no,
            particulars: req.body.particulars,
            remarks: req.body.remarks,
            amount: req.body.amount
        });

        res.status(201).json("Deposit Entry Successfully Created.");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occured while creating the entry."});
    }
}
//this is the deposit entry editing fucntion.
export async function editDeposits(req, res) {
    try {
        const parsedDate = parse(req.body.date, 'MM/dd/yyyy', new Date());
        const currentUser = await User.findByPk(req.body.user_id);

        const { deposit_id } = req.body;

        const deposits = await Deposits.findOne({ where: {deposit_id: deposit_id} });

        if(currentUser.role !== 'Admin') {
            return res.status(403).json({ error: "Forbidden: Only admin users can edit deposit entries." });
        }

        if(!deposits) {
            return res.status(401).json({ message: "Updated failed, deposit entry not found."});
        }

        await Deposits.update({
            date: parsedDate,
            check_no: req.body.check_no,
            particulars: req.body.particulars,
            remarks: req.body.remarks,
            amount: req.body.amount
        },
        {
            where: {
                deposit_id: req.body.deposit_id
            }
        }
    );

        res.status(201).json("Deposit Entry Successfully Edited.");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occured while updating the entry."});
    }
}
//this is the deposit entry deletion function.
export async function deleteDeposits(req, res) {
    try {
        const currentUser = await User.findByPk(req.body.user_id);

        const { deposit_id } = req.body;

        const deposits = await Deposits.findOne({ where: {deposit_id: deposit_id} });

        if (currentUser.role !== 'Admin') {
            return res.status(403).json({ error: "Forbidden: Only admin users can delete deposit entries." });
        }

        if (!deposits) {
            return res.status(401).json({ message: "Deletion failed, deposit entry not found." });
        }

        await Deposits.destroy({
            where: {
                deposit_id: req.body.deposit_id
            }
        }
        );

        res.status(201).json("Deposit Entry Successfully Deleted.");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occured while deleting the entry." });
    }
}