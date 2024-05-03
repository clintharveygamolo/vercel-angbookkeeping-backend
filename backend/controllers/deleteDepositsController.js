import Deposits from '../models/depositsModel.js';

export async function deleteDesposits(req, res) {
    try {
        const currentUser = await User.findByPk(req.body.user_id);

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

        res.status(201).json();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occured while deleting the entry." });
    }
}