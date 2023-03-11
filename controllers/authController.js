const { registration, login, logout } = require("../service/authService");
const { asyncCtrlWrapper } = require("../helpers");

const signupCtrl = async (req, res) => {
  const { name, email, password } = req.body;
  await registration(name, email, password);
  res.json({
    RequestBody: {
      user: {
        email,
        password,
      },
    },
  });
};

const loginCtrl = async (req, res) => {
  const { email, password } = req.body;
  const {name, token} = await login(email, password);
  // res.json({ status: "success", data: { token } });
  res.json({
    RequestBody: {
      token,
      user: {
        name,
        email,
      },
    },
  });
};

const logoutCtrl = async (req, res) => {
  const { _id } = req.user;
  await logout(_id);
  res.status(204).json();
};

module.exports = {
  signupCtrl: asyncCtrlWrapper(signupCtrl),
  loginCtrl: asyncCtrlWrapper(loginCtrl),
  logoutCtrl: asyncCtrlWrapper(logoutCtrl),
};
