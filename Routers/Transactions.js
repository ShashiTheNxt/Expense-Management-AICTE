import express from "express";
import {
  addTransactionController,
  deleteTransactionController,
  getAllTransactionController,
  updateTransactionController,
  deleteMultipleTransactionsController,
  getSingleTransactionController,
} from "../controllers/transactionController.js";

const router = express.Router();

// Add transaction route
router.post("/addTransaction", addTransactionController);

// Get all transactions route
router.post("/getTransaction", getAllTransactionController);

// Delete transaction route
router.post("/deleteTransaction/:id", deleteTransactionController);

// Update transaction route
router.put("/updateTransaction/:id", updateTransactionController);

// Delete multiple transactions route
router.post("/deleteMultipleTransactions", deleteMultipleTransactionsController);

// Get single transaction route
router.get("/getTransaction/:id", getSingleTransactionController);

export default router;