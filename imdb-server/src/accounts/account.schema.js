const Joi = require("joi");
const validateRequest = require("../_middleware/validate-request");

function registerSchema(req, res, next) {
  const schema = Joi.object({
    fullName: Joi.string().required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

function authenticateSchema(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

module.exports = {
  registerSchema,
  authenticateSchema,
};
