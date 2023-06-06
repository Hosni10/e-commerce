import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
      unique: true,
      minLength: [2, "category name too short"],
    },
    slug: {
      required: true,
      type: String,
      lowercase: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
)
categorySchema.post('init',(doc)=>{
  doc.image=process.env.BASE_URL + "/category/" + doc.image
  })


export const categoryModel = mongoose.model('category',categorySchema )