// src/utils/validation.js
// Enterprise-Grade Contact Form Validator for NxtWeave Solutions

/**
 * Validates the contact form input details strictly to prevent spam, empty submissions, and dummy data.
 * Supports name syntax, strict email verification, domain typo checking, phone formatting, 
 * repetitive/sequential spam mitigation, and minimum query character thresholds.
 * 
 * @param {Object} data - The form data containing { name, email, phone, message, service }
 * @returns {Object} { isValid: boolean, error: string }
 */
export function validateContactForm({ name, email, phone, message, service }) {
  // 1. Name Validation
  if (!name || String(name).trim().length < 2) {
    return { isValid: false, error: "Please enter your full name (minimum 2 characters)." };
  }
  const nameRegex = /^[a-zA-Z\s]{2,50}$/;
  if (!nameRegex.test(String(name).trim())) {
    return { isValid: false, error: "Name must only contain alphabetic characters and spaces." };
  }

  // 2. Email Validation
  const trimmedEmail = String(email).trim().toLowerCase();
  if (!trimmedEmail) {
    return { isValid: false, error: "Email address is required." };
  }
  
  // Strict format check matching E.164 standards
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailRegex.test(trimmedEmail)) {
    return { isValid: false, error: "Please enter a valid email address (e.g., name@gmail.com)." };
  }

  const parts = trimmedEmail.split("@");
  const domain = parts[1];

  // Specific list of dummy or fake domains identified in testing
  const dummyDomains = [
    "test.com", "example.com", "xyz.com", "abc.com", "lest.com", 
    "gmaise.com", "temp.com", "mailinator.com", "demo.com", "fake.com"
  ];
  if (dummyDomains.includes(domain)) {
    return { isValid: false, error: `The email domain '@${domain}' is invalid or blocked. Please provide an active, genuine email.` };
  }

  // Common user typo checks to help clients correct input errors
  const commonTypos = {
    "gamil.com": "gmail.com",
    "gmal.com": "gmail.com",
    "gmaill.com": "gmail.com",
    "gmile.com": "gmail.com",
    "gmai.com": "gmail.com",
    "gmaise.com": "gmail.com",
    "yaho.com": "yahoo.com",
    "yhoo.com": "yahoo.com",
    "hotmal.com": "hotmail.com",
    "outlok.com": "outlook.com"
  };
  if (commonTypos[domain]) {
    return { isValid: false, error: `Did you mean '@${commonTypos[domain]}'? Please verify your email domain spelling.` };
  }

  // 3. Phone / Contact Number Validation
  if (!phone) {
    return { isValid: false, error: "Phone number is required." };
  }
  
  // Remove non-numeric characters (spaces, +, -, parentheses)
  const digitsOnly = String(phone).replace(/[^0-9]/g, "");
  
  if (digitsOnly.length < 10) {
    return { isValid: false, error: "Please enter a valid contact number with at least 10 digits." };
  }
  if (digitsOnly.length > 15) {
    return { isValid: false, error: "Contact number cannot exceed 15 digits." };
  }

  // Block obviously repetitive values (e.g., 0000000000, 9999999999)
  const repetitiveRegex = /^(\d)\1{9,}$/;
  if (repetitiveRegex.test(digitsOnly)) {
    return { isValid: false, error: "Please enter a genuine, active phone number (avoid repetitive digits)." };
  }
  
  // Block sequential fake phone numbers
  const sequentialNumbers = [
    "1234567890", "0987654321", "2345678901", "3456789012", "0123456789",
    "1111111111", "2222222222", "3333333333", "4444444444", "5555555555"
  ];
  if (sequentialNumbers.some(seq => digitsOnly.includes(seq))) {
    return { isValid: false, error: "Please enter a genuine, active contact number." };
  }

  // 4. Target Service Dropdown check
  if (service !== undefined && String(service).trim() === "") {
    return { isValid: false, error: "Please select a target service from the dropdown list." };
  }

  // 5. Message / Query Box Validation (No blank messages, must have content detail)
  if (!message || String(message).trim().length < 10) {
    return { isValid: false, error: "Please provide a detailed query message (minimum 10 characters) explaining your requirements." };
  }

  return { isValid: true, error: "" };
}
