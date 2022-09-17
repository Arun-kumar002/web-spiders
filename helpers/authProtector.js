const jwt=require('jsonwebtoken')
const AuthSchema=require('../models/AuthModel')
const ErrorResponse=require('../utils/ErrorResponse')
const {JWT_SECRET}=require('../config/index')

let protected=async (req,res,next)=>{
    let token;
    //checking header
    if(req.headers.authorization && req.headers.authorization.split(' ')[0]==='Bearer'){
        token=req.headers.authorization.split(' ')[1];
        
    }
    else if(req.cookies.cookie){
        token=req.cookies.cookie
        console.log(token); //for logout purpose
        console.log('im here');
       }
   if(!token){
    return next(new ErrorResponse('not authorized',403))
   }
  
   try {
     //verify token 
     let decode=jwt.verify(token,JWT_SECRET);
     req.user=await AuthSchema.findById(decode.id)
    //  console.log( req.user);
 
   } catch (err) {
    console.log(err);
    return next(new ErrorResponse('not authorized invalid token',403))
   }
   next()
  
}
//auth user based on permission role based auth
const authorizeduser=(...role)=>{
    return (req,res,next)=>{
        console.log(role);
        if(!role.includes(req.user.role)){
            return next(new ErrorResponse(`user role is ${req.user.role}not authorized`,400))
        }
        else{
            next()
        }
    }
  }

module.exports={protected,authorizeduser}


