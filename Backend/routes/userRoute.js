import express from "express";
import { create ,login,posts,getAll,comments} from "../controller/userController.js";
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
// route.delete("/delete/:id", deleteUser);
   
export default route;   