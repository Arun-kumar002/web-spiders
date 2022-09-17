const { JWT_COOKIE_EXPIRE } = require('../config');
const AuthSchema=require('../models/AuthModel')
const ErrorResponse=require('../utils/ErrorResponse')
const {NODE_ENV}=require('../config/index')
const passport=require('passport')


exports.registerController=async(req,res,next)=>{
  try {
  
    let user=await AuthSchema.create(req.body)
    sendResposeToken(user,201,res)
  } catch (err) {
    console.log(err)
    next(new ErrorResponse('internal server error wait for sometime',500) )
  }
}

exports.signinController=async (req,res,next)=>{
  try {
    // console.log(req.user);
    let {email,password}=req.body;

    // console.log(res.cookie('cookie'));
    console.log(req.user)
    let user=await AuthSchema.findOne({ email}).select("+password")
    console.log(user);
    if(!user){
      return next(new ErrorResponse('user is not exist',500))
    }
    if(!email && !password){
      return next(new ErrorResponse('email and password is requird'),404)
    }
     let matchpass=await user.matchPASSWORD(password)
     console.log(matchpass);
     if(!matchpass){
      return next(new ErrorResponse('password is not matched'),404)
     }
     sendResposeToken(user,201,res)
    
  } catch (err) {
    console.log(err);
    next(new ErrorResponse('internal server error wait for sometime',500))
  }
}

exports. userAuth = passport.authenticate("jwt", { session: false });

//cookie
const sendResposeToken=(user,statusCode,res)=>{
  let token=user.getTOKEN()
  let option={
    expires:new Date(Date.now()+JWT_COOKIE_EXPIRE*24*60*60*1000),
    httpOnly:true,
    secure:NODE_ENV==="production",
  };
  res.status(statusCode).cookie('cookie',token).json({sucess:true,message:'success',token})
}

exports. logoutController=async(req,res,next)=>{
  try {
    res.cookie('cookie','',{
      expires:new Date(new Date().getTime()+5*60*1000),
      httpOnly:true
    })
    res.status(203).json({success:true ,message:'successfully log out'})
  } catch (error) {
    console.log(error);
    res.end('not ok')
    
  }
}

