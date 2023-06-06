import slugify from "slugify";
import AppError from "../../utils/AppError.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import { subCategoryModel } from "../../../database/models/subcategory.model.js";
import { deleteOne } from "../handlers/factor.handler.js";



const createSubCategory = catchAsyncError(async (req, res) => {
  const { name , category } = req.body;
  let result = new subCategoryModel({ name, category ,slug: slugify(name) });
  await result.save();
  res.json({ message: "success", result });
});

const getAllSubCategories = catchAsyncError(async (req, res) => {
    let filter = {}
    if(req.params.categoryId){
        filter={category: req.params.categoryId}
    }
  let result = await subCategoryModel.find(filter);
  res.json({ message: "success", result });
});

const getSubCategory = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let result = await subCategoryModel.findById(id);
  !result && next(new AppError("subcategory not found"), 404)
  result && res.json({ message: "success", result })
})

const updateSubCategory = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { name , category } = req.body;
  let result = await subCategoryModel.findByIdAndUpdate(id, {
    name,
    category,
    slug: slugify(name),
  }, {new: true});
  !result && next(new AppError("subcategory not found"), 404)
  result && res.json({ message: "success", result })
})

const deleteSubCategory = deleteOne(subCategoryModel)

export {
  createSubCategory,
  getAllSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
}
