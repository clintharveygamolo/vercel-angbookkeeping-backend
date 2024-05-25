import Account from "../models/accountModel.js";

export async function deleteBankAccount(req, res) {
  const { account_id } = req.params.account_id;
  try {
    const account = await Account.findByPk(account_id);
    if (!account) {
      res.status(404).json({ message: "Account not found!" });
    }
    await account.destroy();
    res.status(200).json({ message: "Account successfully deleted!" });
  } catch (error) {
    res.status(400).json({
      message: "An error occured while attempting to delete account!",
    });
  }
}
