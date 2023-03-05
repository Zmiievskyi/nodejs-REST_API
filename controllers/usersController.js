// const {User} = require('../schemas');
const { asyncCtrlWrapper } = require("../helpers");

const getCurrent = (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    ResponseBody: {
      email,
      subscription,
    },
  });
};

module.exports = {
  getCurrent: asyncCtrlWrapper(getCurrent),
};
