const multer = require("multer");

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
// Define the maximum size for uploading file i.e. 10 KB
const maxSize = 10 * 1024; // 10 KB in bytes
// Create the multer instance
var upload = multer({
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: (req, file, cb) => {
    const allowedFileTypes = ["text/plain"];

    if (allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only txt files are allowed."));
    }
  },
});

module.exports = upload;
