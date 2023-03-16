const {User} = require('../../schemas');

const createUser = async (data) => {
  return await User.create(data);
};

module.exports = createUser;