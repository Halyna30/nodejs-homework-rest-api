const express = require("express");
const router = express.Router();
const ctrl = require("../../../controllers/contacts");
const guard = require("../../../helpers/guard");
const {
  validateCreateContact,
  validateUpdateContact,
} = require("./validation");

router.get("/", guard, ctrl.getAll);

router.get("/:contactId", guard, ctrl.getById);

router.post("/", guard, validateCreateContact, ctrl.create);

router.delete("/:contactId", guard, ctrl.removeContact);

router.put("/:contactId", guard, validateUpdateContact, ctrl.updateContact);

module.exports = router;
