const express = require("express");
const router = express.Router();
const { validationResult, query } = require("express-validator");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../model/index.js");

const validator = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }
  next();
};

router.get("/", async (req, res, next) => {
  try {
    const response = await listContacts();
    return res
      .status(200)
      .json({ status: "success", code: 200, data: { response } });
  } catch (e) {
    next(e);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const {contactId} = req.params;
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

router.post("/", async (req, res, next) => {
  try {
    const newContact = await addContact(req.body);

    return res
      .status(201)
      .json({ status: "success", code: 201, data: { newContact } });
  } catch (e) {
    next(e);
  }
});

router.delete(
  "/:contactId",
    async (req, res, next) => {
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
  }
);

router.put(
  "/:contactId",
  async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const newContact  = await updateContact(contactId, req.body);
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
  }
);

module.exports = router;
