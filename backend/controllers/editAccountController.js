import User from "../models/userModel.js";
import bcrypt from "bcrypt";

export async function editAccount(req, res) {
  try {
    const { user_id } = req.params.user_id;
    const { name, password, role } = req.body;
    const currentUser = await User.findByPk(user_id);

    if (currentUser.role !== "Admin") {
      return res
        .status(403)
        .json({ message: "Forbidden: Only admin users can create new users." });
    }

    if ((!name, !password, !role)) {
      return res.status(401).json({ message: " All fields are required!" });
    }
    const newUserPass = await bcrypt.hash(password, 12);
    const editedUser = await User.update({
      name: name,
      password: newUserPass,
      role: role,
    });

    res.status(201).json({ message: "User information successfully updated!" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occured while updating the user." });
  }
}
