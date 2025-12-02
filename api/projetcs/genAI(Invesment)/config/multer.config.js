const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../tempFiles")); // correct relative path
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.fieldname}-${file.originalname}`);
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 1024 * 10 }, // 10GB
});

module.exports = { upload };
