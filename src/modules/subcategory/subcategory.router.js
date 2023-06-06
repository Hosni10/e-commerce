import express from "express";
import * as subcategory from "./subcategory.controller.js";
import { createSubcategorySchema, deleteSubcategorySchema, getSubcategorySchema, updateSubcategorySchema } from "./subcategory.validation.js";
import { validation } from "../../middleware/validation.js";

const subCategoryRouter = express.Router({mergeParams:true});

subCategoryRouter.route("/").post(validation(createSubcategorySchema),subcategory.createSubCategory).get(subcategory.getAllSubCategories);
subCategoryRouter
  .route("/:id")
  .get(validation(getSubcategorySchema),subcategory.getSubCategory)
  .delete(validation(deleteSubcategorySchema),subcategory.deleteSubCategory)
  .put(validation(updateSubcategorySchema),subcategory.updateSubCategory);

export default subCategoryRouter;
