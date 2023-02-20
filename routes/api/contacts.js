const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/contacts");
const { isValidId, validateBody } = require("../../middlewares");

const schema = require('../../schemas/index')

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", validateBody(schema.addSchema), ctrl.add);

router.delete("/:contactId",isValidId, ctrl.deleteById);

router.put("/:contactId", isValidId, ctrl.update);

router.patch("/:contactId/favorite", validateBody(schema.updateFavorite), ctrl.update);

module.exports = router;
