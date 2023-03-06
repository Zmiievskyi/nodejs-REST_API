const Jwt = require("jsonwebtoken");
const { Unauthorized } = require("http-errors");
// const HttpError = require("../helpers/HttpError");
const { User } = require("../schemas/index");

const { SECRET } = process.env;

const authMiddleware = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  try {
    if (bearer !== "Bearer") {
      throw new Unauthorized();
    }
    const { id } = Jwt.verify(token, SECRET);

    const user = await User.findById(id);

    if (!user || !user.token) {
      throw new Unauthorized();
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddleware;
