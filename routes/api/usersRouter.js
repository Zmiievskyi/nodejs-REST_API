const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/usersController");
const { authMiddleware, uploadMiddleware,validateBody } = require("../../middlewares");
const schema = require('../../schemas/userModel')

router.get("/current", authMiddleware, ctrl.getCurrent);
router.get("/verify/:verificationToken", ctrl.verifyEmail);
router.post("/verify", validateBody(schema.joiUserVerifySchema), ctrl.resendVerifiedEmail);

router.patch(
  "/avatars",
  authMiddleware,
  uploadMiddleware.single("avatar"),
  ctrl.updateUser
);
router.patch("/:id", authMiddleware, ctrl.changeSubscription);

module.exports = router;
