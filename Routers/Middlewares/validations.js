import { body } from "express-validator";

export const validateRegistration = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Invalid email"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];

export const validateLogin = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

export const validateAddTransaction = [
  body("title").notEmpty().withMessage("Title is required"),
  body("amount").isNumeric().withMessage("Amount must be a number"),
  body("description").notEmpty().withMessage("Description is required"),
  body("date").isISO8601().withMessage("Invalid date format"),
  body("category").notEmpty().withMessage("Category is required"),
  body("transactionType").notEmpty().withMessage("Transaction type is required"),
];