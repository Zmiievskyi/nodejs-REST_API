const { User } = require("../schemas");
const { HttpError, asyncCtrlWrapper } = require("../helpers");

const getCurrent = (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    ResponseBody: {
      email,
      subscription,
    },
  });
};

const changeSubscription = async (req, res) => {
  const { id } = req.params;
  const { subscription } = req.body;
  const user = await User.findOne({ id });
  if (!user) {
    throw HttpError(404, `User with ${id} not found`);
  }
  await User.findByIdAndUpdate(user._id, { subscription });

  res.json({
    ResponseBody: {
      email: user.email,
      subscription,
    },
  });
};

module.exports = {
  getCurrent: asyncCtrlWrapper(getCurrent),
  changeSubscription: asyncCtrlWrapper(changeSubscription),
};
