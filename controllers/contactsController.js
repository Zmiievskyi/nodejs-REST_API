const { HttpError, asyncCtrlWrapper } = require("../helpers");
const service = require("../service");

const getAll = async (req, res) => {
  const listContacts = await service.getAllContacts(req);
  if (!listContacts) {
    throw HttpError(400);
  }
  res.json({ message: "All contacts", list: listContacts });
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contactById = await service.getContactById(contactId);
  if (!contactById) {
    throw HttpError(404, `Contact with ${contactId} not found`);
  }
  res.json({ message: "User", user: contactById });
};

const add = async (req, res) => {
  const { _id } = req.user;
  const addContact = await service.addContact(req.body, _id);
  res.status(201).json({ message: "user added", code: 201, user: addContact });
};

const deleteById = async (req, res) => {
  const removedContact = await service.deleteContactById(req.params.contactId);
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
    throw HttpError(400, "missing some of fields");
  }
  const refreshedContact = await service.updateContact(
    req.params.contactId,
    req.body
  );
  if (!refreshedContact) throw HttpError(404);
  res.json({
    message: "Update was complited",
    code: 200,
    contact: refreshedContact,
  });
};

const updateFavoriteStatus = async (req, res) => {
  if (Object.keys(req.body).length < 1) {
    throw HttpError(400, "The favorite field is missing");
  }
  const refreshedStatus = await service.updateStatusContact(
    req.params.contactId,
    req.body
  );
  if (!refreshedStatus)
    throw HttpError(404, "The status update was unsuccessful.");
  res.json({
    message: "The status was updated",
    code: 200,
    contact: refreshedStatus,
  });
};

module.exports = {
  getAll: asyncCtrlWrapper(getAll),
  getById: asyncCtrlWrapper(getById),
  add: asyncCtrlWrapper(add),
  deleteById: asyncCtrlWrapper(deleteById),
  update: asyncCtrlWrapper(update),
  updateFavoriteStatus: asyncCtrlWrapper(updateFavoriteStatus),
};
