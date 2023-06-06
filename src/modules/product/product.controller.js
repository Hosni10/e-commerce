import slugify from "slugify";
import AppError from "../../utils/AppError.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import { productModel } from "../../../database/models/product.model.js";
import { ApiFeatures } from "../../utils/ApiFeatures.js";
import { deleteOne } from "../handlers/factor.handler.js";

const createProduct = catchAsyncError(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  req.body.imgCover = req.files.imgCover[0].filename;
  req.body.images = req.files.images.map((obj) => obj.filename);
  let result = new productModel(req.body);
  await result.save();
  res.json({ message: "success", result });
});

const getAllProducts = catchAsyncError(async (req, res) => {
  let apiFeatures = new ApiFeatures(productModel.find(), req.query)
    .paginate()
    .filter()
    .fields()
    .search()
    .sort();

  let result = await apiFeatures.mongooseQuery;
  res.status(200).json({ message: "success", page: apiFeatures.page, result });
});

const getProduct = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let result = await productModel.findById(id);
  !result && next(new AppError("Product not found"), 404);
  result && res.json({ message: "success", result });
});

const updateProduct = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.title) req.body.slug = slugify(req.body.title);
  let result = await productModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  !result && next(new AppError("Product not found"), 404);
  result && res.json({ message: "success", result });
});

const deleteProduct = deleteOne(productModel);

export {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
