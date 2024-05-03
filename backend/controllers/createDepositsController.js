import Deposits from '../models/depositsModel.js';

export async function createDeposits(req, res) {
    try {
        await Deposits.create({
            deposit_id: req.body.deposit_id,
            particular: req.body.particular,
            date: req.body.date,
            amount: req.body.amount,
            remarks: req.body.remarks
        });

        res.status(201).json("Creation success, deposit entry has been created.");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occured while creating the entry."});
    }
}