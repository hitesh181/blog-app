import express from "express"
import cors from "cors"
import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js"
import postRoutes from "./routes/posts.js"
import { upload } from "./upload.js";

// import {usersRoutes} from "./routes/users.js"

const app = express();
const PORT= process.env.PORT  || 5000
app.use(express.json())
app.use(cors())
app.use(cookieParser())


//  THIS ROUTE SPECIFICALLY HANDLES UPLOADING OF THE IMAGE
  app.post("/api/upload", upload.single("file"), function (req, res) {
    console.log("on route upload")

    const file = req.file;

    console.log("File is ", file)
    res.status(200).json(file.filename);
  });


app.use("/api/posts", postRoutes)
app.use("/api/auth", authRoutes)

app.get('/',(req, res)=>{
    res.send("Working")
})

mongoose.connect(process.env.DB_URL).
  then(()=>console.log("Mongoose Database connected successfully ")).
  catch(err=>console.log("error occurred ", err))


app.listen(PORT, ()=>{
    console.log("Listeneing on port ", PORT)
})