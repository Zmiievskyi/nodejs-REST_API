
const { User } = require("../../schemas");

const getUser = async (data) => {
  return await User.findOne({ ...data });
};

module.exports = getUser;
