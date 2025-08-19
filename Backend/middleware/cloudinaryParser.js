const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "plans",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const parser = multer({ storage });

module.exports = parser;
