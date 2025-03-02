import express from "express";
import { body, validationResult } from "express-validator";
import { loginControllers, registerControllers } from "../controllers/userController.js";

const router = express.Router();

// Validation middleware for registration
const validateRegistration = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Invalid email"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];

// Validation middleware for login
const validateLogin = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

// Register route with validation
router.post("/register", validateRegistration, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  registerControllers(req, res);
});

// Login route with validation
router.post("/login", validateLogin, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  loginControllers(req, res);
});

export default router;