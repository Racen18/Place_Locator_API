const Joi = require("joi");

const authSchema = Joi.object({
    place_name: Joi.string().required(),
    place_longitude: Joi.number().required(),
    place_latitude: Joi.number().required()
})

module.exports = {
    authSchema
}