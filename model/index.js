const Contact = require("./schemas/contact");

const getAll = async (userId) => {
  const results = await Contact.find({ owner: userId });
  return results;
};

const getContactById = async (userId, id) => {
  const result = await Contact.findOne({ _id: id, owner: userId });
  return result;
};

const removeContact = async (userId, id) => {
  const result = await Contact.findByIdAndRemove({ _id: id, owner: userId });
  return result;
};

const addContact = async (userId, body) => {
  const result = await Contact.create(body);
  return result;
};

const updateContact = async (userId, id, body) => {
  const result = await Contact.findOneAndUpdate(
    {
      _id: id,
      owner: userId,
    },
    { ...body },
    { new: true }
  );
  return result;
};

module.exports = {
  getAll,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
