import express from "express";
//process the request body
import bodyParser from "body-parser";
import mongoose from "mongoose";
//cross origin requests
import cors from "cors";
import dotenv from "dotenv";
//file upload this and multer 
import multer from "multer";
//requests saftey
import helmet from "helmet";
//log requests made to your Node. js server,
import morgan from "morgan";
//properply set paths when we configure directories
import path from "path";
import authRoutes from "./routes/auth.js"
import { fileURLToPath } from "url";
import connectDB from "./mongodb/connectDB.js";
import {register} from "./controllers/auth.js";



//Configuration
const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);
dotenv.config();
const app=express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());
//help storing the pictures locally for assests
app.use("/assests",express.static(path.join(__dirname,'public/assets')));

//file storage
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public/assets");
    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
    }
})

//routes
//upload.single is middleware function to run before hitting the endpoint (register==a controller)
app.post("auth/register",upload.single("picture"),register);

/*routes*/
app.use("/auth",authRoutes);

const startServer=async()=>{
    const port=process.env.PORT || 6100;
    try{
        await connectDB(process.env.ATLAST_URL)
        app.listen(port,()=>console.log(`server has started on ${port}`))
    }catch(e){
        console.log("connection failed");
        console.log(e);
    }
}
startServer();