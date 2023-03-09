const fs = require("fs/promises");
const path = require("path");

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

const updateUser = async (req, res) => {
  const { _id, email } = req.user;
  const { path: tmpDir, originalname } = req.file;
  const fileName = `${_id}_${originalname}`;

  const tempUpload = path.join(__dirname, "../", "public", "avatars", fileName);
  await fs.rename(tmpDir, tempUpload);
  const cover = path.join("http://localhost:3001", "avatars", fileName);
  await User.findByIdAndUpdate(_id, { avatarUrl: cover });

  res.json({
    ResponseBody: {
      email,
      avatarUrl: cover,
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
  updateUser: asyncCtrlWrapper(updateUser),
};
