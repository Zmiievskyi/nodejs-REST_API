const {isValidObjectId}= require('mongoose')
const { HttpError } = require("../helpers/index");

const valiadateId = (req, res, next) => {
  const { contactId } = req.params;
  const isValid = isValidObjectId(contactId);

  if (!isValid) {
    const error = HttpError(400, `${contactId} has not correct format`);
    next(error);
  }
  next();
};

module.exports = valiadateId;
