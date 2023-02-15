const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.resolve("models/contacts.json");
const { v4: uuidv4 } = require("uuid");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contacts) || null;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contactById = contacts.find((user) => user.id === contactId);
  return contactById || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);
  const [result] = contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const id = uuidv4();
  console.log(id);
  contacts.push({
    id: id.split("-")[1],
    ...body,
  });
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return (
    {
      id: id.split("-")[1],
      ...body,
    } || null
  );
};

const updateContact = async (contactId, body) => {
  console.log(contactId);
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);
  console.log(idx);
    if (idx === -1) return null;

  contacts[idx] = {
    ...contacts[idx],
    ...body,
  };
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
