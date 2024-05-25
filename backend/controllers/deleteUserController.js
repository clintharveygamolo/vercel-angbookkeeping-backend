import User from '../models/userModel.js';

export async function deleteUser(req, res) {
    const { user_id } = req.params;
    try {
        const user = await User.findByPk(user_id);
        if (!user) {
            res.status(404).json({ message: "User not found!"});
        }
        await user.destroy();
        res.status(200).json({ message: "User successfully deleted!"});
    } catch (error) {
        res.status(400).json({ message: "An error occured while attempting to delete users!" })
    }
};