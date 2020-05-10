import Joi from "joi";

const schemas = {
    loginSchema: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().regex(/^[\w]{6,30}$/),
    }),
    signUpSchema: Joi.object().keys({
        email: Joi.string().email().required(),
        username: Joi.string().min(2).max(20).required(),
        password: Joi.string().regex(/^[\w]{6,30}$/)
    })
};

export default schemas;