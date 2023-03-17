const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const {
  getUser,
  updateUser: udateUserService,
} = require("../service/userService");
const { User } = require("../schemas");
const { HttpError, asyncCtrlWrapper, sendEmail } = require("../helpers");

const getCurrent = (req, res) => {
  const { name, email, subscription } = req.user;
  res.json({
    ResponseBody: {
      name,
      email,
      subscription,
    },
  });
};

const updateUser = async (req, res) => {
  const { _id, email } = req.user;
  const { path: tempFile, originalname } = req.file;
  const fileName = `${_id}_${originalname}`;

  const tempUpload = path.join(__dirname, "../", "public", "avatars", fileName);
  await Jimp.read(tempFile).then((img) => {
    img.resize(250, 250).write(tempFile);
  });

  await fs.rename(tempFile, tempUpload);
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
    throw HttpError(404, `The user with ${id} was not found`);
  }
  await User.findByIdAndUpdate(user._id, { subscription });

  res.json({
    ResponseBody: {
      email: user.email,
      subscription,
    },
  });
};

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await getUser(verificationToken);

  if (!user) {
    throw HttpError(401, `The user has not been found`);
  }
  await udateUserService(user._id, {
    verify: true,
    verificationToken: "",
  });

  res.json({
    messeage: "The email verification was successful",
  });
};

const resendVerifiedEmail = async (req, res) => {
  const { VERIFICATION_URL } = process.env;
  const { email } = req.body;
  if (!email) {
    throw HttpError(400, `Missing required field email`);
  }
  const user = await getUser({ email });
  if (!user) {
    throw HttpError(401, `The email could not be found`);
  }
  if (user.verify) {
    throw HttpError(400, `The email has already been verified`);
  }
  const verifyEmail = {
    to: email,
    from: "testgoit@meta.ua",
    subject: "Verify email",
    html: `<a target="_blank" href="${VERIFICATION_URL}/verify/${user.verificationToken}"> Click for verify email </a>`,
  };
  await sendEmail(verifyEmail);
  res.json({
    messeage: "The email was sent for verification",
    email
  });
};

module.exports = {
  getCurrent: asyncCtrlWrapper(getCurrent),
  changeSubscription: asyncCtrlWrapper(changeSubscription),
  updateUser: asyncCtrlWrapper(updateUser),
  verifyEmail: asyncCtrlWrapper(verifyEmail),
  resendVerifiedEmail: asyncCtrlWrapper(resendVerifiedEmail),
};
