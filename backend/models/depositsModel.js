import sequelize from '../util/database.js';
import { DataTypes } from 'sequelize';
import { format } from 'date-fns';

const Deposit = sequelize.define("Deposit", {
    deposit_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        get() {
            const rawValue = this.getDataValue('date');
            return format(new Date(rawValue), 'MM/dd/yyyy');
        }
    },
    check_no: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    particulars: {
        type: DataTypes.STRING,
        allowNull: false
    },
    remarks: {
        type: DataTypes.STRING,
        allowNull: true
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            isDecimal: true, // Ensures that the value is a valid decimal number
            isNotNegative(value) {
                if (parseFloat(value) <= 0) {
                    throw new Error('Amount must be a positive number');
                }
            }
        }
    },
});

export default Deposit;