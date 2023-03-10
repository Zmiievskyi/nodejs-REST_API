const validateBody = require('./validateBody');
const valiadateId = require("./valiadateId");
const authMiddleware = require("./authMiddleware");
const uploadMiddleware = require('./uploadMiddleware')

module.exports = {
  validateBody,
  valiadateId,
  authMiddleware,
  uploadMiddleware,
};