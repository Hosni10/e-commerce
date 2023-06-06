import slugify from "slugify";
import AppError from "../../utils/AppError.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import { brandModel } from "../../../database/models/brand.model.js";
import { ApiFeatures } from "../../utils/ApiFeatures.js";
import { deleteOne } from "../handlers/factor.handler.js";


const createBrand = catchAsyncError(async (req, res) => {

  req.body.logo = req.file.filename
  req.body.slug = slugify(req.body.name)
  let result = new brandModel(req.body);
  await result.save();
  res.json({ message: "success", result });
});

const getAllBrands = catchAsyncError(async (req, res) => {
  let apiFeatures = new ApiFeatures(brandModel.find(), req.query)
    .paginate()
    .filter()
    .fields()
    .sort()
    .search();
  let result = await apiFeatures.mongooseQuery;
  res.status(200).json({ message: "success", page: apiFeatures.page, result });;
});

const getBrand = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let result = await brandModel.findById(id);
  !result && next(new AppError("brand not found"), 404)
  result && res.json({ message: "success", result })
})

const updateBrand = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  req.body.logo = req.file.filename
  req.body.slug = slugify(req.body.name)
  let result = await brandModel.findByIdAndUpdate(id,req.body,{new: true});
  !result && next(new AppError("brand not found"), 404)
  result && res.json({ message: "success", result })
})

const deleteBrand = deleteOne(brandModel)

export {
  createBrand,
  getAllBrands,
  getBrand,
  updateBrand,
  deleteBrand,
}
