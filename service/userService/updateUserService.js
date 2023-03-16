const { User } = require("../../schemas");

const updateUser = async (_id, settings) => {
    console.log('update');
  return await User.findByIdAndUpdate(_id, { ...settings });
};
module.exports = updateUser;