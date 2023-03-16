const { Conflict, Unauthorized } = require("http-errors");
const { v1: uuidv1 } = require("uuid");
const gravatar = require("gravatar");
const Jwt = require("jsonwebtoken");
const { VERIFICATION_URL } = process.env;
const { asyncCtrlWrapper, HttpError, sendEmail } = require("../helpers");
const { getUser, createUser, updateUser } = require("../service/userService");

const signupCtrl = async (req, res) => {
  const verificationToken = uuidv1();
  const { email } = req.body;
  const user = await getUser(email);
  if (user) {
    throw new Conflict(`user with ${email} is already exist`);
  }
  const avatarUrl = gravatar.url(email, { protocol: "http", s: "100" });

  const newUser = await createUser({
    ...req.body,
    avatarUrl,
    verificationToken,
  });
  const verifyEmail = {
    to: email,
    from: "testgoit@meta.ua",
    subject: "Verify email",
    html: `<a target="_blank" href="${VERIFICATION_URL}/verify/${verificationToken}"> Click verify email </a>`,
  };

  await sendEmail(verifyEmail);

  res.json({
    RequestBody: {
      user: {
        email: newUser.email,
        verify: newUser.verify,
      },
    },
  });
};

// const verifyEmail = async (req, res) => {
//   const { verificationCode } = req.params;
//   const user = await getUser(verificationCode);
//   if (!user) {
//     throw HttpError(401, `User not found`);
//   }
//   await updateUser(user._id, { verify: true, verificationCode: "" });
// };

const loginCtrl = async (req, res) => {
  const { email, password } = req.body;
  const user = await getUser(email);
  const { SECRET } = process.env;

  if (!user || !user.comparePassword(password)) {
    throw HttpError(401, `Email or password is wrong`);
  }

  if (!user.verify) {
    throw HttpError(401, `Email not verified`);
  }

  const payload = {
    id: user._id,
  };
  const token = Jwt.sign(payload, SECRET, { expiresIn: "1d" });
  await updateUser(user._id, {token});

  res.json({
    RequestBody: {
      token,
      user: {
        name: user.name,
        email,
      },
    },
  });
};

const logoutCtrl = async (req, res) => {
  const { _id } = req.user;
  const token = null;

  const user = await getUser(_id);
  if (!user) {
    throw new Unauthorized();
  }
  await updateUser(_id, token);

  res.status(204).json();
};

module.exports = {
  signupCtrl: asyncCtrlWrapper(signupCtrl),
  loginCtrl: asyncCtrlWrapper(loginCtrl),
  logoutCtrl: asyncCtrlWrapper(logoutCtrl),
  // verifyEmail: asyncCtrlWrapper(verifyEmail),
};
