import User from '../models/userModel.js';

export async function getUsers(req, res) {
    try {
        const userQuery = await User.findAll({
            attributes: ["user_id", "name", "role"]
        });
        res.status(200).json(userQuery);
    } catch (error) {
        res.status(400).json({ error: "An error occured while fetching users!" })
    }
};

export async function getUser(req, res) {
    const [ user_id ] = req.params.user_id;
    try {
        const userQuery = await User.findByPk(user_id);
        res.status(200).json(userQuery);
    } catch (error) {
        res.status(400).json({ error: "An error occured while fetching users!" })
    }
};