const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const schema = require('../../schemas/index')
const { validateBody } = require("../../middlewares/index");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateBody(schema.addSchema), ctrl.add);

router.delete("/:contactId", ctrl.deleteById);

router.put("/:contactId", ctrl.update);

module.exports = router;
