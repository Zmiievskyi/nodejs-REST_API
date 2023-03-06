const { Contact } = require("../schemas/index");

const getAllContacts = async (req) => {
  const { _id } = req.user;
  const { page = 1, limit = 5, favorite = false } = req.query;
  if (favorite) {
    return Contact.find({ owner: _id, favorite }, "name email phone").populate(
      "owner",
      "_id name email"
    );
  }
  const skip = (page - 1) * limit;
  const user = await Contact.find({ owner: _id }, "name email phone", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id name email");

  if (user.length < 1) {
    return Contact.find({ owner: _id }, "name email phone", {
      skip: 0,
      limit: Number(limit),
    }).populate("owner", "_id name email");
  }
  return user;
};

const getContactById = (id) => {
  return Contact.findOne({ _id: id });
};

const addContact = (body, id) => {
  return Contact.create({ ...body, owner: id });
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
