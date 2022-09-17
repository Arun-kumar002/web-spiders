const jwt=require('jsonwebtoken')
const AuthSchema=require('../models/AuthModel')
const ErrorResponse=require('../utils/ErrorResponse')
const {JWT_SECRET}=require('../config/index')

let role=async(req,res,next)=>{
    try {
    //    let token=req.headers.authorization.split(' ')[1];
    //    console.log(req.user);
    //    if(!token){
    //     return next(new ErrorResponse('not authorized',403))
    //    }
    //    let decode=jwt.verify(token,JWT_SECRET);
    //  let user=await AuthSchema.findById(decode.id)
     let role=req.user.role
     console.log(role);
     if(role==='user'){
        next()
     }
     else{
        res.end('not auth role')
     }
    } catch (error) {
        console.log(error);
        res.end('not authorized role')
    }
}

module.exports=role;