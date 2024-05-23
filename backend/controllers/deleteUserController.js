import User from '../models/userModel.js';

export async function deleteUser(req, res) {
    const user_id = req.params.user_id;

    try {
        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }
        await user.destroy();
        return res.status(200).json({ message: "User successfully deleted!" });
    } catch (error) {
        return res.status(400).json({ message: "An error occurred while attempting to delete users!"});
    }
};