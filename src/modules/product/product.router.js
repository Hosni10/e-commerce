import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "./product.controller.js";
import { createProductSchema, deleteProductSchema, getProductSchema, updateProductSchema } from "./product.validation.js";
import { validation } from "../../middleware/validation.js";
import { uploadMixOfFiles } from "../../middleware/fileUpload.js";


let fieldsArray = [{ name: 'imgCover', maxCount: 1 }, { name: 'images', maxCount: 10 }] 

const productRouter = express.Router();



productRouter.route("/").post(uploadMixOfFiles(fieldsArray,'product'),validation(createProductSchema),createProduct).get(getProduct);
productRouter
  .route("/:id")
  .get(validation(getProductSchema),getAllProducts)
  .delete(validation(deleteProductSchema),deleteProduct)
  .put(validation(updateProductSchema),updateProduct);


export default productRouter
  