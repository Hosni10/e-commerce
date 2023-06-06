import Joi from "joi";

export const createProductSchema = Joi.object({
    name:Joi.string().min(2).max(20).required()
})


export const getProductSchema = Joi.object({
    id:Joi.string().hex().length(24).required()
     
})

export const deleteProductSchema = Joi.object({
    id:Joi.string().hex().length(24).required()
     
})


export const updateProductSchema = Joi.object({
    name:Joi.string().min(2).max(20),
    id:Joi.string().hex().length(24).required()
     
})

