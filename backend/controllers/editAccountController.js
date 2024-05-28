import User from "../models/userModel.js";
import bcrypt from "bcrypt";

export async function editAccount(req, res) {
  try {
    const { user_id, userIdToEdit } = req.params;
    const { name, password, role } = req.body;

    if (!name && !password && !role) {
      return res
        .status(401)
        .json({ message: "At least one field is required to update" });
    }

    const currentUser = await User.findByPk(user_id);
    if (currentUser.role !== "Admin") {
      return res
        .status(403)
        .json({ message: "Forbidden: Only admin users can create new users." });
    }

    const editedUser = await User.findByPk(userIdToEdit);
    if (!editedUser) {
      return res.status(404).json({ message: "User not found!" });
    }
    const updatedFields = {};

    if (name) {
      updatedFields.name = name;
    }

    if (password) {
      updatedFields.password = await bcrypt.hash(password, 12);
    }

    if (role) {
      updatedFields.role = role;
    }

    await editedUser.update(updatedFields);

    return res
      .status(201)
      .json({ message: "User information successfully updated!" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occured while updating the user." });
  }
}

// import User from "../models/userModel.js";
// import bcrypt from "bcrypt";

// export async function editAccount(req, res) {
//   try {
//     const { user_id, userIdToEdit } = req.params;
//     const { name, password, role } = req.body;

//     if ((!name, !password, !role)) {
//       return res.status(401).json({ message: " All fields are required!" });
//     }

//     const currentUser = await User.findByPk(user_id);
//     if (currentUser.role !== "Admin") {
//       return res
//         .status(403)
//         .json({ message: "Forbidden: Only admin users can create new users." });
//     }

//     const editedUser = await User.findByPk(userIdToEdit);

//     const editedUserPass = await bcrypt.hash(password, 12);
//     const newEditedUserDetails = editedUser.update({
//       name: name,
//       password: editedUserPass,
//       role: role,
//     });

//     return res
//       .status(201)
//       .json({ message: "User information successfully updated!" });
//   } catch (error) {
//     console.error(error);
//     return res
//       .status(500)
//       .json({ message: "An error occured while updating the user." });
//   }
// }
