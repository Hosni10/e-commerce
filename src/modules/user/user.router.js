import express from "express";
import * as user from "./user.controller.js";
import { createBrandSchema, deleteBrandSchema, getBrandSchema, updateBrandSchema } from "./brand.validation.js";
import { validation } from "../../middleware/validation.js";


const userRouter = express.Router();


userRouter.route("/").post(validation(createUserSchema),user.createUser).get(user.getAllUsers);
userRouter
  .route("/:id")
  .get(validation(getUserSchema),user.getUser)
  .delete(validation(deleteUserSchema),user.deleteUser)
  .put(validation(updateUserSchema),user.updateUser);

userRouter.patch('/changeUserPassword/:id',user.changeUserPassword)

export default userRouter
