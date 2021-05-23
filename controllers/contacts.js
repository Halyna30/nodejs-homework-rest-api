const Contacts = require("../model/index.js");

const getAll = async (req, res, next) => {
  try {
    const response = await Contacts.getAll();
    return res
      .status(200)
      .json({ status: "success", code: 200, data: { response } });
  } catch (e) {
    next(e);
  }
};

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contacts.getContactById(contactId);
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
};

const addContact = async (req, res, next) => {
  try {
    const newContact = await Contacts.addContact(req.body);

    return res
      .status(201)
      .json({ status: "success", code: 201, data: { newContact } });
  } catch (e) {
    next(e);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contacts.removeContact(contactId);
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
};

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const newContact = await Contacts.updateContact(contactId, req.body);
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
};

module.exports = {
  getAll,
  getById,
  addContact,
  removeContact,
  updateContact,
};
