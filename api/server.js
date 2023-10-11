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

// Enable CORS for your Netlify frontend
// const allowedOrigins = ['https://peppy-alpaca-839a5b.netlify.app/'];
// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
// }));
app.use(cors({
  origin: ["http://localhost:3000", "https://blog-app-k0le.onrender.com/"]
}))

//app.use(cors())
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