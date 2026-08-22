import { body } from "express-validator";

export const validateCreateClient = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 Characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required!")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),

  body("phone")
    .optional({ checkFalsy: true })
    .trim()
    .matches(/^[6-9]\d{9}$/)
    .withMessage("Phone Number must be a valid 10-digit Number"),

  body("gstin")
    .optional({ checkFalsy: true })
    .trim()
    .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/)
    .withMessage("Invalid GSTIN firmat"),

  body("contactPerson")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 2 })
    .withMessage("Contact person name must be at least 2 Characters"),

  body("address.street")
    .optional({ checkFalsy: true })
    .trim(),

  body("address.city")
    .optional({ checkFalsy: true })
    .trim(),

  body("address.state")
    .optional({ checkFalsy: true })
    .trim(),

  body("address.pincode")
    .optional({ checkFalsy: true })
    .trim()
    .matches(/^[1-9][0-9]{5}$/)
    .withMessage("Pincode must be a valid 6-digit number"),
];
