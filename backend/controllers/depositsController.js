import Deposits from '../models/depositsModel.js';
import User from '../models/userModel.js';
//this is the deposit creation function.
export async function createDeposits(req, res) {
    try {
        await Deposits.create({
            deposit_id: req.body.deposit_id,
            particular: req.body.particular,
            date: req.body.date,
            amount: req.body.amount,
            remarks: req.body.remarks
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
            particular: req.body.particular,
            date: req.body.date,
            amount: req.body.amount,
            remarks: req.body.remarks
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