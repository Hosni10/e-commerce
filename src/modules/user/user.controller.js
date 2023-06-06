import AppError from "../../utils/AppError.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import { ApiFeatures } from "../../utils/ApiFeatures.js";
import { deleteOne } from "../handlers/factor.handler.js";
import { userModel } from "../../../database/models/user.model.js";


const createUser = catchAsyncError(async (req, res,next) => {
let user = await userModel.findOne({email:req.body.email})
if(user) return next(new AppError('account already exist',409))
  let result = new userModel(req.body);
  await result.save();
  res.json({ message: "success", result });
});

const getAllUsers = catchAsyncError(async (req, res) => {
  let apiFeatures = new ApiFeatures(userModel.find(), req.query)
    .paginate()
    .filter()
    .fields()
    .sort()
    .search();
  let result = await apiFeatures.mongooseQuery;
  res.status(200).json({ message: "success", page: apiFeatures.page, result });;
});

const getUser = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let result = await userModel.findById(id);
  !result && next(new AppError("User not found"), 404)
  result && res.json({ message: "success", result })
})

const updateUser = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  let result = await userModel.findByIdAndUpdate(id,req.body,{new: true});
  !result && next(new AppError("User not found"), 404)
  result && res.json({ message: "success", result })
})

const deleteUser = deleteOne(userModel)


const changeUserPassword = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
  
    let result = await userModel.findByIdAndUpdate(id,req.body,{new: true});
    !result && next(new AppError("User not found"), 404)
    result && res.json({ message: "success", result })
  })

export {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  changeUserPassword
}
