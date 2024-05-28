import Company from "../models/CompanyModel.js";

export async function createCompany(req, res) {
  const { companyName } = req.body;
  try {
    const newCompany = await Company.create({
      companyName: companyName,
    });

    res
      .status(201)
      .json({ message: `Successfully created company: ${companyName}` });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occured while creating the Company" });
  }
}
