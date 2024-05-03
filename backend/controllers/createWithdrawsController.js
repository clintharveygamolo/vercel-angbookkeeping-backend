import Withdraws from '../models/withdrawsModel.js';

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

        res.status(201).json("Creation success, withdrawal entry has been created.");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occured while creating the entry."});
    }
}