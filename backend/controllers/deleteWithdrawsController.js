import Withdraws from '../models/withdrawsModel.js';

export async function deleteWithdraws(req, res) {
    try {
        const currentUser = await User.findByPk(req.body.user_id);

        if(currentUser.role !== 'Admin') {
            return res.status(403).json({ error: "Forbidden: Only admin users can delete withdrawal entries." });
        }

        await Withdraws.destroy({
            where: {
                withdraw_id: req.body.withdraw_id
            }
        }
    );

        res.status(201).json();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occured while deleting the entry."});
    }
}