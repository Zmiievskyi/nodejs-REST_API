const express = require("express");
const Joi = require("joi");
const router = express.Router();

const Api = require("../../models/contacts");
const {HttpError} = require("../../helpers/index");

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().min(3).max(30).required(),
  phone: Joi.string().min(3).max(30).required(),
});

router.get("/", async (req, res, next) => {
  try {
    const listContacts = await Api.listContacts();
    if (!listContacts) {
      throw HttpError(400);
    }
    res.json({ message: "All contacts", list: listContacts });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactById = await Api.getContactById(contactId);
    if (!contactById) {
      throw HttpError(404, `Contact with ${contactId} not found`);
    }
    res.json({ message: "User", user: contactById });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const addContact = await Api.addContact(req.body);
    res
      .status(201)
      .json({ message: "Added user", user: addContact, code: 201 });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const removedContact = await Api.removeContact(req.params.contactId);
    if (!removedContact) {
      throw HttpError(404, `Contact with ${req.params.contactId} not found`);
    }
    res.json({
      message: "contact deleted",
      code: 200,
      "deleted-contact": removedContact,
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    if (Object.keys(req.body).length < 1) {
      throw HttpError(400, "missing fields");
    }
    const refreshedContact = await Api.updateContact(
      req.params.contactId,
      req.body
    );
    if (!refreshedContact) throw HttpError(404);
    res.json({
      message: "Update complited",
      code: 200,
      contact: refreshedContact,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
