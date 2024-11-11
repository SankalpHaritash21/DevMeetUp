const mongoose = require("mongoose");
const validator = require("validator");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 20,
    },
    lastName: {
      type: String,
      required: true,
    },
    emailId: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value))
          throw new Error("Invalid Email Format:" + value);
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a Strong Password: " + value);
        }
      },
    },
    age: {
      type: Number,
      required: true,
      min: 18,
    },
    gender: {
      type: String,
      required: true,
      lowercase: true,
      enum: {
        values: ["male", "female", "other"],
        message: `{VALUE} is not a valid gender type`,
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://www.inforwaves.com/media/2021/04/dummy-profile-pic-300x300-1.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid Photo URL: " + value);
        }
      },
    },
    about: {
      type: String,
      default: "This is the defalit about of the user!",
    },
    skills: {
      type: [String],
      validate: {
        validator: function (value) {
          return (
            Array.isArray(value) &&
            value.length > 0 &&
            value.every((item) => typeof item === "string") &&
            new Set(value).size === value.length
          );
        },
        message: "Skills must be a non-empty array of unique strings.",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
