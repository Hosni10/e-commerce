import Joi from "joi";

export const createSubcategorySchema = Joi.object({
    name:Joi.string().min(2).max(20).required()
})


export const getSubcategorySchema = Joi.object({
    id:Joi.string().hex().length(24).required()
     
})

export const deleteSubcategorySchema = Joi.object({
    id:Joi.string().hex().length(24).required()
     
})


export const updateSubcategorySchema = Joi.object({
    name:Joi.string().min(2).max(20),
    id:Joi.string().hex().length(24).required()
     
})

