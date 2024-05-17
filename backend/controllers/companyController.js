import Company from "../models/CompanyModel";

export async function createCompany(req, res) {
  const { companyName } = req.body;

  try {
    const newCompany = await Company.create({
      comanyName: companyName,
    });
    res
      .status(200)
      .json({ message: `Successfully created company: ${companyName}` });
  } catch (error) {
    res.status(401).json({ message: "Error creating bank" });
  }
}
