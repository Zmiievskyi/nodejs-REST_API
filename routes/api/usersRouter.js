const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const ctrl = require("../../controllers/usersController");
const { authMiddleware } = require("../../middlewares");

const rootDir = __dirname.split("\\").slice(0, -2).join("\\");
const tmpDir = path.join(rootDir, "tmp");
const multerConfig = multer.diskStorage({
  destination: tmpDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: multerConfig });

router.get("/current", authMiddleware, ctrl.getCurrent);
router.patch(
  "/avatars",
  authMiddleware,
  upload.single("avatar"),
  ctrl.updateUser
);
router.patch("/:id", authMiddleware, ctrl.changeSubscription);

module.exports = router;
