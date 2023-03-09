const path = require("path");
const multer = require("multer");

// const rootDir = __dirname.split("\\").slice(0, -2).join("\\");
const tempDir = path.join(__dirname, '../', "tmp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: multerConfig });

module.exports = upload;


