import * as Joi from "joi";

export const UserInfomationSchema = Joi.object({
    username: Joi.string().allow(''),
    nickname: Joi.string().allow(''),
    firstname: Joi.string().allow(''),
    lastname: Joi.string().allow(''),
    position: Joi.string().allow(''),
    nationality: Joi.string().allow(''),
    tel: Joi.string().allow(''),
    startDate: Joi.string().allow(''),
    profilePic: Joi.string().allow(''),
    coverPic: Joi.string().allow(''),
})