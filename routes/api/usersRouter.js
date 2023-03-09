const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/usersController");
const { authMiddleware, uploadMiddleware } = require("../../middlewares");

router.get("/current", authMiddleware, ctrl.getCurrent);
router.patch(
  "/avatars",
  authMiddleware,
  uploadMiddleware.single("avatar"),
  ctrl.updateUser
);
router.patch("/:id", authMiddleware, ctrl.changeSubscription);

module.exports = router;
