const { Contact } = require("../schemas/index");

const getAllContacts = async () => {
  const contact = await Contact.find({},"name email phone");
  return contact;
};

const getContactById = (id) => {
  return Contact.findOne({ _id: id });
};

const addContact = ({ name, email, phone }) => {
  return Contact.create({ name, email, phone, favorite: false });
};

const updateContact = (id, fields) => {
  return Contact.findByIdAndUpdate({ _id: id }, fields, { new: true });
};

const updateStatusContact = (contactId, body) => {
  return Contact.findByIdAndUpdate({ _id: contactId }, body);
};

const deleteContactById = (id) => {
  return Contact.findByIdAndRemove({ _id: id });
};

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  updateContact,
  updateStatusContact,
  deleteContactById,
};
