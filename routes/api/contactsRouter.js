const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/contactsController");
const {
  authMiddleware,
  valiadateId,
  validateBody,
} = require("../../middlewares");

const schema = require("../../schemas/contactModel");

router.get("/", authMiddleware, ctrl.getAll);
router.get("/:contactId", valiadateId, ctrl.getById);
router.post(
  "/",
  authMiddleware,
  validateBody(schema.joiContactSchema),
  ctrl.add
);
router.delete("/:contactId", valiadateId, ctrl.deleteById);
router.put("/:contactId", valiadateId, ctrl.update);
router.patch(
  "/:contactId/favorite",
  validateBody(schema.joiUpdateFavoriteSchema),
  ctrl.updateFavoriteStatus
);

module.exports = router;
