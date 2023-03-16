const Joi = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { handleSchemaValidationErrors } = require("../helpers");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleSchemaValidationErrors);

const joiContactSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().min(3).max(30),
  phone: Joi.string().min(3).max(30).required(),
  favorite: Joi.bool().default(false),
});

const joiUpdateFavoriteSchema = Joi.object({
  favorite: Joi.bool().default(false).required(),
});

const Contact = mongoose.model("contact", contactSchema);

module.exports = {
  joiContactSchema,
  joiUpdateFavoriteSchema,
  Contact,
};
