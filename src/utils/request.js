const validator = require("validator");

const validateSignupData = (req) => {
  const {
    firstName,
    lastName,
    emailId,
    password,
    age,
    gender,
    skills = [],
    about,
    photoUrl,
  } = req.body;

  // Validate `firstName` and `lastName`
  if (!firstName || firstName.length < 3 || firstName.length > 20) {
    throw new Error("First name must be between 3 and 20 characters.");
  }
  if (!lastName) {
    throw new Error("Last name is required.");
  }

  // Validate `emailId` format
  if (!validator.isEmail(emailId)) {
    throw new Error("Invalid email format.");
  }

  if (
    !password ||
    !validator.isStrongPassword(password, {
      minLength: 8, // Minimum length of 8
      minLowercase: 1, // At least one lowercase letter
      minUppercase: 1, // At least one uppercase letter
      minNumbers: 1, // At least one number
      minSymbols: 1, // At least one special character
      returnScore: false, // Do not return a score; check all conditions
    }) ||
    !/^.*[@_].*$/.test(password) || // At least one of @ or _
    /[^a-zA-Z0-9@_]/.test(password) // Only allow alphanumeric, @, and _
  ) {
    throw new Error(
      "Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character."
    );
  }

  // Validate `age`
  if (!Number.isInteger(parseInt(age, 10)) || parseInt(age, 10) < 18) {
    throw new Error("Age must be a valid integer and at least 18.");
  }

  // Validate `gender`
  const allowedGenders = ["male", "female", "other"];
  if (!allowedGenders.includes(gender)) {
    throw new Error("Invalid gender type.");
  }

  // Validate `skills` array
  if (
    !Array.isArray(skills) ||
    !skills.every((item) => typeof item === "string")
  ) {
    throw new Error("Skills must be an array of strings.");
  }
  if (new Set(skills).size !== skills.length) {
    throw new Error("Skills array must contain unique values.");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "photoUrl",
    "gender",
    "age",
    "about",
    "skills",
  ];

  const isEditAllowed = Object.keys(req.body).every((key) =>
    allowedEditFields.includes(key)
  );

  return isEditAllowed;
};

const validatePassword = (req) => {
  const allowedEditFields = ["userId", "currentPassword", "newPassword"];

  const isEditAllowed = Object.keys(req.body).every((key) =>
    allowedEditFields.includes(key)
  );

  return isEditAllowed;
};
module.exports = {
  validateSignupData,
  validateEditProfileData,
  validatePassword,
};
