const express = require("express");
const router = express.Router();
const { authMiddleware, validateBody } = require("../../middlewares");
const ctrl = require("../../controllers/authController");
const schema = require("../../schemas/userModel");

router.post("/signup", validateBody(schema.joiUserSchema), ctrl.signupCtrl);
router.post("/login", ctrl.loginCtrl);
router.get("/logout", authMiddleware, ctrl.logoutCtrl);

module.exports = router;
