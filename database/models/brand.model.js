
import mongoose from "mongoose";

const brandSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: [true, "brand name is required"],
      minLength: [2, "brand name too short"],
    },
    slug: {
      required: true,
      type: String,
      lowercase: true,
    },
    logo: {
      type: String,
    },
  },
  { timestamps: true }
)
brandSchema.post('init',(doc)=>{
doc.logo=process.env.BASE_URL + "/brand/" + doc.logo
})



export const brandModel = mongoose.model('brand',brandSchema )