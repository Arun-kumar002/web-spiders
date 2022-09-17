const AuthSchema=require('../models/AuthModel')
const ErrorResponse=require('../utils/ErrorResponse')
const ProfileSchema=require('../models/ProfileModel')

const CourseSchema=require('../models/courseModel')

exports.getprofileController=async(req,res,next)=>{
  try {   
    let user=await AuthSchema.findById(req.user.id).select("+password")
    res.status(200).json({success:true,user})
  } catch (err) {
    console.log(err);
    next(new ErrorResponse('error machi check',500))
  }
}

exports.creatProfileController=async(req,res,next)=>{
    try {
     let user=await AuthSchema.findById(req.user.id)
     let data={user,...req.body};
     let profile=await new ProfileSchema(data).save()
     console.log(profile);
     let userup=await AuthSchema.updateOne({_id:req.user.id},{$set:{profile:profile}})
     res.status(200).json({success:true,userup,profile})
    } catch (err) {
        console.log(err);
        next(new ErrorResponse('post error machi check',500))
    }


}

exports.getMe=async(req,res)=>{
    try {
      console.log(req.user);
        let payload=await ProfileSchema.find().populate('user',['email','username'])
    res.status(200).json({success:true,payload})
    } catch (err) {
        console.log(err);
        next(new ErrorResponse('get me error machi check',500))
    }
}

exports.purchaseController=async(req,res)=>{
  try {
    let id=req.user.profile[0]._id
  let payload=await CourseSchema.findOne({$and:[{course_name:req.body.course_name},{course_language:req.body.course_language},{course_trainer:req.body.course_trainer},{course_duration:req.body.course_duration}]}).lean()
  // console.log(payload);
  // console.log(id._id);
  let purchase=await ProfileSchema.findById(id).updateOne({$push:{purchasecourse:payload}})
  // console.log(purchase);
  res.status(200).json({success:true,payload,purchase})
  } catch (error) {
    console.log(error);
    res.end('error')
  }
}