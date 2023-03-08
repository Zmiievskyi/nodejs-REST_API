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

  const rootDir = __dirname.split("\\").slice(0, -1).join("\\");
  const { path: tmpDir, originalname } = req.file;
  const tempUpload = path.join(rootDir, "public", "avatars", originalname);
  await fs.rename(tmpDir, tempUpload);
  const cover = path.join('http://localhost:3001', "avatars", originalname);
  const user = req.user;
  await User.findByIdAndUpdate(user._id, { avatarUrl:cover });

  res.json({
    ResponseBody: {
      email: user.email,
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
