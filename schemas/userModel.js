const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Joi = require("joi");

const Schema = mongoose.Schema;
const { handleSchemaValidationErrors } = require("../helpers");

const subscrOptions = ["starter", "pro", "business"];

const userSchema = new Schema(
  {
    name: {
      type: String,
      // required: [true, "Name is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: [...subscrOptions],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarUrl: String,
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSchemaValidationErrors);

userSchema.pre("save", async function () {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

// userRegistrationSchema.methods.setPassword = async function (password) {
//   this.password = await bcrypt.hash(password, 10);
// };
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("user", userSchema);

const joiUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(6).max(12).required(),
});


module.exports = {
  joiUserSchema,
  User,
};
