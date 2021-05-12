const fsPromises = require("fs").promises;
const path = require("path");
const { v4: uuid } = require("uuid");


const contactsPath = path.join(__dirname, "contacts.json");

async function readFiles(path) {
  try {
    const file = await fsPromises.readFile(path, 'utf-8');
    const list = JSON.parse(file);
    
    return list;
  } catch (err) {
    console.log(err);
  }
}

async function writeFiles(path, data) {
  try {
    await fsPromises.writeFile(path, JSON.stringify(data), "utf-8");
  } catch (err) {
    console.log(err);
  }
}

const listContacts = async () => {
  try {
    const contacts = await readFiles(contactsPath);
    return contacts;
  } catch (err) {
    console.log(err);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await readFiles(contactsPath);
    const contact = contacts.find((el) => el.id.toString() === contactId);
    return contact;
  } catch (err) {
    console.log(err);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await readFiles(contactsPath);
    const contactToRemove = contacts.find(
      ({ id }) => id.toString() === contactId
    );
  
    if (!contactToRemove) {
      return;
    }
    const data = contacts.filter((el) => el.id.toString() !== contactId);
    await writeFiles(contactsPath, data);

    return contactToRemove;
  } catch (err) {
    console.log(err);
  }
};

const addContact = async (body) => {
  try {
    const contacts = await readFiles(contactsPath);
    const id = uuid();
    const contact = { id, ...body };
    const data = [...contacts, contact];
    await writeFiles(contactsPath, data);

    return contact;
  } catch (err) {
    console.log(err);
  }
};

const updateContact = async (contactId, body) => {
  const contacts = await readFiles(contactsPath);
  const contactToUpdate = contacts.find(
    ({ id }) => id.toString() === contactId
  );
  if (!contactToUpdate) {
    return;
  }

  const updatedContact = { ...contactToUpdate, ...body };
  const updatedList = contacts.map((contact) =>
    contact.id.toString() === contactId ? updatedContact : contact
  );
  await writeFiles(contactsPath, updatedList);
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
