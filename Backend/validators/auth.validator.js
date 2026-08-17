import { body } from "express-validator";



export const validateRegister = [
     body("name")
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 3 }).withMessage('Name must be at least 3 chracters')
        .matches(/^[A-Za-z\s]+$/).withMessage('Name must not contain numbers or special characters'),
    
    body("email")
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please provide a valid email')
        .normalizeEmail(),
    
    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 8 }).withMessage('Pasword must be atleast 6 character')
        .matches(/^[A-Z]/).withMessage('Password must start with a capital letter')
        .matches(/(?:.*[0-9]){3,}/).withMessage('Password must contain at least 3 numbers')
        .matches(/(?:.*[A-Za-z]){4,}/).withMessage('Password must contain at least 4 letters')
        .matches(/[@$&]/).withMessage('Password must contain at least one special character (@, $, &)'),
]

