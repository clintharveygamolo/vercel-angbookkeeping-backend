import Deposits from '../models/depositsModel.js';
import User from '../models/userModel.js';
import { parse } from 'date-fns';
//this is the deposit creation function.
export async function createDeposits(req, res) {
    try {
        const { deposit_id, date, check_no, particulars, remarks, amount } = req.body;

        const parsedDate = parse(date, 'MM/dd/yyyy', new Date());

        const existingVar = await Deposits.findOne({ where: { check_no } });
        if (existingVar) {
            return res.status(409).json({ message: "Check Number already exists" });
        }

        await Deposits.create({
            deposit_id,
            date: parsedDate,
            check_no,
            particulars,
            remarks,
            amount
        });

        res.status(201).json("Deposit Entry Successfully Created.");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occured while creating the entry." });
    }
}
//this is the deposit entry editing function.
export async function editDeposits(req, res) {
    try {
        const parsedDate = parse(req.body.date, 'MM/dd/yyyy', new Date());
        const currentUser = await User.findByPk(req.body.user_id);
        const { deposit_id, check_no, particulars, remarks, amount } = req.body;

        const deposits = await Deposits.findOne({ where: { deposit_id: deposit_id } });

        if (currentUser.role !== 'Admin') {
            return res.status(403).json({ error: "Forbidden: Only admin users can edit deposit entries." });
        }

        if (!deposits) {
            return res.status(401).json({ message: "Updated failed, deposit entry not found." });
        }

        const existingDeposit = await Account.findOne({
            where: { check_no: check_no, deposit_id: { [Op.ne]: deposit_id } }
        });
      
        if (existingDeposit) {
            return res.status(409).json({ message: "Check Number already exists!" });
        }

        await Deposits.update({
            date: parsedDate,
            check_no: check_no,
            particulars: particulars,
            remarks: remarks,
            amount: amount
        },
            {
                where: {
                    deposit_id: deposit_id
                }
            }
        );

        res.status(201).json("Deposit Entry Successfully Edited.");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occured while updating the entry." });
    }
}
//this is the deposit entry deletion function.

/*export async function deleteDeposits(req, res) {
    try {
        const currentUser = await User.findByPk(req.body.user_id);

        const {deposit_id} = req.body;

        const deposits = await Deposits.findOne({ where: { deposit_id: deposit_id } });

        if (currentUser.role !== 'Admin') {
            return res.status(403).json({ error: "Forbidden: Only admin users can delete deposit entries." });
        }

        if (!deposits) {
            return res.status(401).json({ message: "Deletion failed, deposit entry not found." });
        }

        await Deposits.destroy({
            where: {
                deposit_id: req.body.deposit_id
            }
        }
        );

        res.status(201).json("Deposit Entry Successfully Deleted.");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occured while deleting the entry." });
    }
}
*/

export async function deleteDeposits(req, res) {
    try {
        const { user_id } = req.body; // Extract user_id from request body
        const { deposit_id } = req.params; // Extract deposit_id from URL parameters

        // Log the received user_id and deposit_id
        console.log(`Received user_id: ${user_id}, deposit_id: ${deposit_id}`);

        const currentUser = await User.findByPk(user_id);

        // Log currentUser
        console.log(`Current user: ${JSON.stringify(currentUser)}`);

        if (!currentUser) {
            return res.status(404).json({ error: "User not found." });
        }

        if (currentUser.role !== 'Admin') {
            return res.status(403).json({ error: "Forbidden: Only admin users can delete deposit entries." });
        }

        const deposit = await Deposits.findOne({ where: { deposit_id } });

        // Log deposit
        console.log(`Deposit found: ${JSON.stringify(deposit)}`);

        if (!deposit) {
            return res.status(404).json({ message: "Deletion failed, deposit entry not found." });
        }

        await Deposits.destroy({ where: { deposit_id } });

        res.status(200).json("Deposit Entry Successfully Deleted.");
    } catch (error) {
        console.error("Error occurred while deleting deposit entry:", error);
        res.status(500).json({ error: "An error occurred while deleting the entry." });
    }
}

//this is the deposit get function.
export async function getDeposits(req, res) {
    try {
        const depositQuery = await Deposits.findAll({
            attributes: ["deposit_id", "date", "check_no", "particulars", "remarks", "amount"],
        });
        res.status(200).json(depositQuery);
    } catch (error) {
        res.status(400).json({ error: "An error occured while fetching deposits!" });
    }
}

export async function getDeposit(req, res) {
    const [deposit_id] = req.params.deposit_id;
    try {
        const depositQuery = await User.findByPk(deposit_id);
        res.status(200).json(depositQuery);
    } catch (error) {
        res.status(400).json({ error: "An error occured while fetching deposits!" });
    }
}