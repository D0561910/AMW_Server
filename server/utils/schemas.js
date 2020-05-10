const Joi = require("joi");

const schemas = {
    loginSchema: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().regex(/^[\w]{8,30}$/),
    }),
    signUpSchema: Joi.object().keys({
        email: Joi.string().email().required(),
        name: Joi.string().min(2).max(20).required(),
        password: Joi.string().regex(/^[\w]{8,30}$/)
    })
};

module.exports = schemas;
