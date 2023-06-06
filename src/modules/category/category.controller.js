import slugify from "slugify";
import { categoryModel } from "../../../database/models/category.model.js";
import AppError from "../../utils/AppError.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import { ApiFeatures } from "../../utils/ApiFeatures.js";
import { deleteOne } from "../handlers/factor.handler.js";


const createCategory = catchAsyncError(async (req, res) => {

  req.body.image = req.file.filename
  req.body.slug = slugify(req.body.name)
  let result = new categoryModel(req.body);
  await result.save();
  res.status(201).json({ message: "success", result });
});

const getAllCategories = catchAsyncError(async (req, res, next) => {
  let apiFeatures = new ApiFeatures(categoryModel.find(), req.query)
    .paginate()
    .filter()
    .fields()
    .sort()
    .search();
  let result = await apiFeatures.mongooseQuery;
  res.status(200).json({ message: "success", page: apiFeatures.page, result });
});

const getCategory = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let result = await categoryModel.findById(id);
  !result && next(new AppError("category not found"), 404);
  result && res.json({ message: "success", result });
});

const updateCategory = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  req.body.image = req.file.filename
  req.body.slug = slugify(req.body.name)
  let result = await categoryModel.findByIdAndUpdate(
    id,
    req.body,
    { new: true }
  );
  !result && next(new AppError("category not found"), 404);
  result && res.json({ message: "success", result });
});

const deleteCategory = deleteOne(categoryModel);

export {
  createCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
