const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/usersController");
const { authMiddleware } = require("../../middlewares");

// const schema = require("../../schemas/contactModel");


router.get("/current", authMiddleware, ctrl.getCurrent);

module.exports = router;
