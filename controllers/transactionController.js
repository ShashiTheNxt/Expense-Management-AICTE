import Transaction from "../models/TransactionModel.js";
import User from "../models/UserSchema.js";
import moment from "moment";

// Add Transaction Controller
export const addTransactionController = async (req, res) => {
  // Your existing code...
};

// Get All Transactions Controller
export const getAllTransactionController = async (req, res) => {
  // Your existing code...
};

// Delete Transaction Controller
export const deleteTransactionController = async (req, res) => {
  // Your existing code...
};

// Update Transaction Controller
export const updateTransactionController = async (req, res) => {
  // Your existing code...
};

// Delete Multiple Transactions Controller
export const deleteMultipleTransactionsController = async (req, res) => {
  try {
    const { transactionIds, userId } = req.body;

    if (!transactionIds || !Array.isArray(transactionIds)) {
      return res.status(400).json({
        success: false,
        message: "Invalid transaction IDs",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // Delete transactions from the database
    await Transaction.deleteMany({ _id: { $in: transactionIds } });

    // Remove transactions from the user's transactions array
    user.transactions = user.transactions.filter(
      (transaction) => !transactionIds.includes(transaction._id.toString())
    );
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Transactions deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get Single Transaction Controller
export const getSingleTransactionController = async (req, res) => {
  try {
    const transactionId = req.params.id;
    const userId = req.body.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const transaction = await Transaction.findById(transactionId);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    return res.status(200).json({
      success: true,
      transaction,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};