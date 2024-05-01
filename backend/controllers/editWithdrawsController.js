import Withdraws from '../models/withdrawsModel.js';

export async function editWithdraws(req, res) {
    try {
        const currentUser = await User.findByPk(req.body.user_id);

        if(currentUser.role !== 'Admin') {
            return res.status(403).json({ error: "Forbidden: Only admin users can edit withdrawal entries." });
        }

        const editWithdraws = await Withdraws.update({
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

        res.status(201).json(editWithdraws);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occured while updating the entry."});
    }
}