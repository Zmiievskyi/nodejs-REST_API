const { HttpError, ctrlWrapper } = require("../helpers/index");
const  Api  = require("../models/contacts");

const getAll = async (req, res) => {
  const listContacts = await Api.listContacts();
  if (!listContacts) {
    throw HttpError(400);
  }
  res.json({ message: "All contacts", list: listContacts });
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contactById = await Api.getContactById(contactId);
  if (!contactById) {
    throw HttpError(404, `Contact with ${contactId} not found`);
  }
  res.json({ message: "User", user: contactById });
};

const add = async (req, res) => {
  const addContact = await Api.addContact(req.body);
  res.status(201).json({ message: "Added user", user: addContact, code: 201 });
};

const deleteById = async (req, res) => {
  const removedContact = await Api.removeContact(req.params.contactId);
  if (!removedContact) {
    throw HttpError(404, `Contact with ${req.params.contactId} not found`);
  }
  res.json({
    message: "contact deleted",
    code: 200,
    "deleted-contact": removedContact,
  });
};

const update = async (req, res) => {
  if (Object.keys(req.body).length < 1) {
    throw HttpError(400, "missing fields");
  }
  const refreshedContact = await Api.updateContact(
    req.params.contactId,
    req.body
  );
  if (!refreshedContact) throw HttpError(404);
  res.json({
    message: "Update complited",
    code: 200,
    contact: refreshedContact,
  });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  update: ctrlWrapper(update),
};
