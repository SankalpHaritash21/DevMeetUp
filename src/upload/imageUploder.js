const fs = require("fs");
const cloudinary = require("cloudinary");
const User = require("../models/user");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const userUploadImage = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Upload file to Cloudinary
    const result = await cloudinary.v2.uploader.upload(
      req.file.path,
      {
        folder: "profile_pictures",
        tags: ["user_profile", "profile_picture", userId],
      },
      (error, result) => {
        if (error) {
          console.error(error);
          res.status(400).json({ message: "Cloudinary upload failed" });
          return;
        }
        fs.unlinkSync(req.file.path); // remove file from server
        return result;
      }
    );

    const uploadedImageUrl = result.secure_url;
    const publicId = result.public_id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { photoUrl: uploadedImageUrl },
      { new: true } // Return the updated user document
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ message: "Failed to upload image", error });
  }
};

module.exports = { userUploadImage };
