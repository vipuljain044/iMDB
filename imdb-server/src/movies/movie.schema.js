const Joi = require("joi");
const validateRequest = require("../_middleware/validate-request");

function addMovieSchema(req, res, next) {
  const schema = Joi.object({
    director: Joi.string().required(),
    imdb_score: Joi.number().required(),
    name: Joi.string().required(),
    genre: Joi.array().items(Joi.string().required()),
  });
  validateRequest(req, next, schema);
}

function updateMovieSchema(req, res, next) {
  const schema = Joi.object({
    _id: Joi.string().required(),
    director: Joi.string().required(),
    imdb_score: Joi.number().required(),
    name: Joi.string().required(),
    genre: Joi.array().items(Joi.string().required()),
  });
  validateRequest(req, next, schema);
}
function deleteMovieSchema(req, res, next) {
  const schema = Joi.object({
    id: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

module.exports = {
  addMovieSchema,
  updateMovieSchema,
  deleteMovieSchema,
};
