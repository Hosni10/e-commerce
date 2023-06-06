import mongoose from "mongoose";

const couponSchema = mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "coupon code is required"],
      trim: true,
      unique: true,
    },
    discount: {
      type: Number,
      min: 0,
      requiered: [true, "coupon discount is required"],
    },
    expires: {
      type: Date,
      required: [true, "coupon date is required"],
    },
  },
  { timestamps: true }
);

export const couponModel = mongoose.model("coupon", couponSchema);
