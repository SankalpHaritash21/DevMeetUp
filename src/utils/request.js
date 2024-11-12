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

  // Validate `password` strength
  if (!validator.isStrongPassword(password) || !password) {
    throw new Error("Password must be at least 6 characters long.");
  }

  // Validate `age`
  if (!Number.isInteger(age) || age < 18) {
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

  // const user = new User({
  //   firstName: firstName,
  //   lastName: lastName,
  //   emailId: emailId,
  //   password: password,
  //   age: age,
  //   gender: gender,
  //   skills: skills,
  //   about: about,
  //   photoUrl: photoUrl,
  // });
};

module.exports = { validateSignupData };
