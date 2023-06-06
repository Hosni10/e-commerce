import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import  categoryRouter  from "./src/modules/category/category.router.js";
import morgan from "morgan";
import dotenv from 'dotenv';
import  AppError  from "./src/utils/AppError.js";
import { globalErrorMiddleware } from "./src/middleware/globalErrorMiddleware.js";
import subCategoryRouter from "./src/modules/subcategory/subcategory.router.js";
import brandRouter from "./src/modules/brands/brand.router.js";
import productRouter from "./src/modules/product/product.router.js";
import userRouter from "./src/modules/user/user.router.js";

dotenv.config()

const app = express();
const port = 3000;
app.use(express.json())
app.use(morgan('dev'))


app.use(express.static('uploads'))
app.use('/api/v1/categories', categoryRouter)
app.use('/api/v1/subcategories',subCategoryRouter)
app.use('/api/v1/brands',brandRouter)
app.use('/api/v1/products',productRouter)
app.use('/api/v1/users',userRouter)




app.all('*',(req,res,next)=>{
    next(new AppError(`can't find this route: ${req.originalUrl}`), 404)
})

app.use(globalErrorMiddleware)

dbConnection();

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

process.on('unhandledRejection',(err)=>{
console.log('unhandledRejection',err);
})