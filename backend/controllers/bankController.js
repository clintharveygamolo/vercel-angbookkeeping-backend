import Bank from "../models/BankModel.js";

export async function createBank(req, res) {
  const { bank_name } = req.body;

  try {
    const newBank = await Bank.create({
      bank_name: bank_name,
    });
    res
      .status(201)
      .json({ message: `Successfully created bank: ${bank_name}` });
  } catch (error) {
    res.status(401).json({ message: "Error creating bank" });
  }
}
