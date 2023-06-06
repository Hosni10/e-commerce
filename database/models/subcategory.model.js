import mongoose from "mongoose";

const subCategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "subcategory name is required"],
      trim: true,
      unique: true,
      minLength: [2, "subcategory name too short"],
    },
    slug: {
      required: true,
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref:"category"
    },
  },
  { timestamps: true }
);


export const subCategoryModel = mongoose.model('subCategory',subCategorySchema )