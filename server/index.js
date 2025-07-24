import express from "express";
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import db from "./config/db.js"
import cookieParser from "cookie-parser";
import route from "./routes/user.routes.js";

const app=express();
const port=process.env.PORT||3000;

db();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}))

app.use('/api/v1/user',route)
app.listen(port,(req,res)=>{
    console.log(`Server is running at port ${port}`);
})

