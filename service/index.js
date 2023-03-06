const {
  getAllContacts,
  getContactById,
  addContact,
  updateContact,
  updateStatusContact,
  deleteContactById,
} = require("./contactService");
const { registration, login, logout } = require("./authService");

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  updateContact,
  updateStatusContact,
  deleteContactById,
  registration,
  login,
  logout,
};
