import Joi from "@hapi/joi";
import moment from "moment";
const since = moment().format("YYYY-MM-DD");
const tomorrow = moment().add(1, "days");

const schemas = {
  loginSchema: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string()
      .regex(/^[\w]{6,30}$/)
      .required(),
  }),
  signUpSchema: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().min(2).max(20).required(),
    password: Joi.string()
      .regex(/^[\w]{6,30}$/)
      .required(),
  }),
  basicInfoSchema: Joi.object().keys({
    projectid: Joi.string().min(2).max(100).required(),
    startDate: Joi.date().optional().min(`${since}`).required(),
    endDate: Joi.date().optional().min(`${tomorrow}`).required(),
    eventAuthor: Joi.string().max(20).required(),
    eventLocation: Joi.string().max(200).required(),
    eventName: Joi.string().max(100).required(),
    event_deatils: Joi.string().max(1000).required(),
  }),
  projectIDOnly: Joi.object().keys({
    projectid: Joi.string().min(2).max(100).required(),
  }),
  projectNameOnly: Joi.object().keys({
    project: Joi.string().min(2).max(50).required(),
  }),
  removeProjectSchema: Joi.object().keys({
    projectid: Joi.string().min(2).max(100).required(),
    projectname: Joi.string().min(2).max(100).required(),
  }),
};

export default schemas;
