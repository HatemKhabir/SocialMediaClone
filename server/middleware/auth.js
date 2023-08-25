import jwt from "jsonwebtoken";


export const verifyToken=async(req,res,next)=>{
try{
let token=req.header("Authorization");
if(!token){
    return res.status(403).send("Access Denied");
}
}catch(e){
    res.status(500).json({error:err.message})
}
}