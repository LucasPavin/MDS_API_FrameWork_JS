// categoryValidation.js

const Joi = require('joi');

function categoryValidation(body) {
  const categoryValidationSchema = Joi.object({
    name: Joi.string().trim().required(),
  });

  return categoryValidationSchema.validate(body);
}

module.exports = categoryValidation;
