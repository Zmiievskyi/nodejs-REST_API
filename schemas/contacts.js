const Joi = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {handleSchemaValidationErrors} = require('../helpers')

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
  },
  { versionKey: false, timestamps: true }
);


contactSchema.post("save", handleSchemaValidationErrors);




const addSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().min(3).max(30).required(),
  phone: Joi.string().min(3).max(30).required(),
  favorite: Joi.bool().default(false)
});

const updateFavorite = Joi.object({
  favorite: Joi.bool().default(false).required()
});


const Contact = mongoose.model("contact", contactSchema);


module.exports = {
  addSchema,
  updateFavorite,
  Contact,
};
