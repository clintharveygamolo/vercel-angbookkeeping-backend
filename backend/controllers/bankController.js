import Bank from "../models/BankModel.js";

export async function createBank(req, res) {
  const { bankName } = req.body;

  try {
    const newBank = await Bank.create({
      bankName: bankName,
    });
    res
      .status(201)
      .json({ message: `Successfully created bank: ${bankName}` });
  } catch (error) {
    res.status(401).json({ message: "Error creating bank" });
  }
}