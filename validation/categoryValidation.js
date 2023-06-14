// categoryValidation.js

const Joi = require('joi');

// on vient aussi donner un type, supprimer les espace blanc et obligatoire
function categoryValidation(body) {
  const categoryValidationSchema = Joi.object({
    name: Joi.string().trim().required(),
  });

  return categoryValidationSchema.validate(body);
}

module.exports = categoryValidation;
