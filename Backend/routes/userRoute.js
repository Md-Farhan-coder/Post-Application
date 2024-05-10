import express from "express";
import { create ,login,posts,getAll,comments,delpost} from "../controller/userController.js";
///, deleteUser, getAll
const route = express.Router();

route.get("/",(req,res)=>{
    res.json("Hello"); 
})
route.post("/create", create); 
route.post('/login', login);
route.post('/posts', posts);
route.get("/getall", getAll);  
route.post('/comment/:id', comments); 
route.post('/delpost', delpost); 
// route.delete("/delete/:id", deleteUser);
   
export default route;   