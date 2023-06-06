import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
  updateCategory,
} from "./category.controller.js";
import subCategoryRouter from "../subcategory/subcategory.router.js";
import {
  createCategorySchema,
  deleteCategorySchema,
  getCategorySchema,
  updateCategorySchema,
} from "./category.validation.js";
import { validation } from "../../middleware/validation.js";
import { uploadSingleFile } from "../../middleware/fileUpload.js";

const categoryRouter = express.Router();

categoryRouter.use("/:categoryId/subcategories", subCategoryRouter);

categoryRouter
  .route("/")
  .post(
    uploadSingleFile("image", "category"),
    validation(createCategorySchema),
    createCategory
  )
  .get(getAllCategories);
categoryRouter
  .route("/:id")
  .get(validation(getCategorySchema), getCategory)
  .delete(validation(deleteCategorySchema), deleteCategory)
  .put(
    uploadSingleFile("image", "category"),
    validation(updateCategorySchema),
    updateCategory
  );

export default categoryRouter;
