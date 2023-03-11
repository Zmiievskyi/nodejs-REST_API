// const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const { Conflict, Unauthorized } = require("http-errors");
const gravatar = require("gravatar");

const { User } = require("../schemas/index");
const HttpError = require("../helpers/HttpError");

const registration = async (name, email, password) => {
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`user with ${email} is already exist`);
  }
  
  const avatarUrl = gravatar.url(email, { protocol: "http", s: "100" });
  return User.create({ name, email, password, avatarUrl });
  //   const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  //   const newUser = new User({ name, email, password });
  //   newUser.setPassword(password);
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  const { SECRET } = process.env;

  if (!user || !user.comparePassword(password)) {
    throw HttpError(401, `Email or password is wrong`);
  }
  const payload = {
    id: user._id,
  };

  const token = Jwt.sign(payload, SECRET, { expiresIn: "1d" });
  await User.findByIdAndUpdate(user._id, { token });
  return {user: user.name, token};
  //   if (!user) {
  //     throw new Unauthorized(`We haven't any user with that ${email} email`);
  //   }
  //   if (!bcrypt.compare(password, user.password)) {
  //     throw HttpError(401, "wrong password");
  //   }
};

const logout = async (id) => {
  const user = await User.findByIdAndUpdate(id, { token: null });
  if (!user) {
    throw new Unauthorized();
  }
  return user;
};

module.exports = {
  registration,
  login,
  logout,
};
