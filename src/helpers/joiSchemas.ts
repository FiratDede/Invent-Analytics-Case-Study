import Joi from "joi"

export const  createUserRequestBodySchema = Joi.object({
    name: Joi.string().strict().trim().min(1).required()
})

export const  createBookRequestBodySchema = Joi.object({
    name: Joi.string().strict().trim().min(1).required()
})

export const  returnBookRequestBodySchema = Joi.object({
    score: Joi.number().integer().strict().min(1).max(10).required()
})