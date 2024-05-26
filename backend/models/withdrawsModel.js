import sequelize from '../util/database.js';
import { DataTypes } from 'sequelize';
import { format } from 'date-fns';

const Withdraw = sequelize.define("Withdraw", {
    withdraw_id: {
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
        allowNull: false,
        validate: {
            isNotNegative(value) {
                if (parseFloat(value) <= 0) {
                    throw new Error('Check Number must be a positive number');
                }
            }
        }
    },
    voucher_no: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isNotNegative(value) {
                if (parseFloat(value) <= 0) {
                    throw new Error('Voucher Number must be a positive number');
                }
            }
        }
    },
    payee: {
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
    }
});

export default Withdraw;