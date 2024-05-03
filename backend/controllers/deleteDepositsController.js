import Deposits from '../models/depositsModel.js';
import User from '../models/userModel.js';

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

        res.status(201).json("Deletion successful, deposit entry has been deleted.");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occured while deleting the entry." });
    }
}