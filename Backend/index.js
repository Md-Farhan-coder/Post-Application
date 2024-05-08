import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser"
import dotenv from "dotenv";
import cors from "cors";
import route from "./routes/userRoute.js";

const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

 
const PORT = process.env.PORT || 7000;
const URL = "mongodb+srv://childkazari:mdfarhan@cluster1.3rllqla.mongodb.net/NayaDB?retryWrites=true&w=majority&appName=Cluster1";

mongoose.connect(URL).then(()=>{

    console.log("DB connected successfully");

    app.listen(PORT, ()=>{
        console.log(`Server is running on port: ${PORT}`);
    })

}).catch(error => console.log(error));



app.use("/", route);