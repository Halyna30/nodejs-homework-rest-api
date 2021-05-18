const express = require("express");
const router = express.Router();
const {
  getAll,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../model/index.js");
const {
  validateCreateContact,
  validateUpdateContact,
} = require("./validation");

router.get("/", async (req, res, next) => {
  try {
    const response = await getAll();
    return res
      .status(200)
      .json({ status: "success", code: 200, data: { response } });
  } catch (e) {
    next(e);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (contact) {
      return res
        .status(200)
        .json({ status: "success", code: 200, data: { contact } });
    }
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not Found" });
  } catch (e) {
    next(e);
  }
});

router.post("/", validateCreateContact, async (req, res, next) => {
  try {
    const newContact = await addContact(req.body);

    return res
      .status(201)
      .json({ status: "success", code: 201, data: { newContact } });
  } catch (e) {
    next(e);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await removeContact(contactId);
    if (contact) {
      return res
        .status(200)
        .json({ status: "success", code: 200, message: "contact deleted" });
    }
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not found" });
  } catch (e) {
    next(e);
  }
});

router.put("/:contactId", validateUpdateContact, async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const newContact = await updateContact(contactId, req.body);
    if (newContact) {
      return res
        .status(200)
        .json({ status: "success", code: 200, data: { newContact } });
    }
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not found" });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
