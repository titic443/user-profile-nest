import Joi from "joi";

export const UserInfomationSchema = Joi.object({
    username: Joi.string().allow('').required(),
    nickname: Joi.string().allow('').required(),
    firstname: Joi.string().allow('').required(),
    lastname: Joi.string().allow('').required(),
    tel: Joi.string().allow('').required(),
    startDate: Joi.string().allow('').required(),
    profilePic: Joi.string().allow('').required(),
    coverPic: Joi.string().allow('').required(),
})