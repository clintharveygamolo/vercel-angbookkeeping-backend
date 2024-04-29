import User from '../models/userModel.js';

export async function createUser(req, res) {
    try {
        const currentUser = await User.findByPk(req.body.user_id);

        if(currentUser.role !== 'Admin') {
            return res.status(403).json({ error: "Forbidden: Only admin users can create new users." });
        }

        const newUser = await User.create({
            name: req.body.name,
            password: req.body.password,
            role: req.body.role
        });

        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occured while creating the user."});
    }
}