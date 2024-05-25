import Company from "../models/CompanyModel.js";

export async function getCompanies(req, res) {
  try {
    const companyQuery = await Company.findAll({
      attributes: ["company_id", "companyName"],
    });
    res.status(200).json(companyQuery);
  } catch (error) {
    res
      .status(400)
      .json({ error: "An error occured while fetching companies!" });
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
