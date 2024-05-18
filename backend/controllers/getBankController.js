import Bank from "../models/BankModel.js";

export async function getBanks(req, res) {
  try {
    const bankQuery = await Bank.findAll({
      attributes: ["bankName"],
    });
    res.status(200).json(bankQuery);
  } catch (error) {
    res.status(400).json({ error: "An error occured while fetching banks!" });
  }
}

// export async function getUser(req, res) {
//   const [user_id] = req.params.user_id;
//   try {
//     const userQuery = await User.findByPk(user_id);
//     res.status(200).json(userQuery);
//   } catch (error) {
//     res.status(400).json({ error: "An error occured while fetching users!" });
//   }
// }
