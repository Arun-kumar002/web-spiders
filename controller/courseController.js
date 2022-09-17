const CourseSchema=require('../models/courseModel')
const ErrorResponse=require('../utils/ErrorResponse')
/*
@access private
@http verbs POST
@url /api/course/create-course
*/
exports.courseController=async (req,res,next)=>{
    try {
    
      let course_image=req.files[0]
    let course_video=req.files[1]
      let {course_id,course_name,course_language,course_description,course_subject,
        course_branch,course_trainer,course_duration,course_category}=req.body

      let data={course_name,course_id,course_language,course_trainer,
        course_duration,course_category,course_image,course_video,course_branch,course_subject,course_description}
      console.log(data);
      
    //   console.log(typeof course_subject);
  //  await (await  new CourseSchema.create(data)).save()
  await  new CourseSchema(data).save()
        

    
       console.log(data);
       res.send('ok')
        
    } catch (err) {
        console.log(err);
        next(new ErrorResponse('hi',500))
        // next(err) //another way
    }
}


exports.editController=async (req,res,next)=>{
  try {
   console.log(req.params.id);
    let course_image=req.files[0]
    let course_video=req.files[1]
    let {course_id,course_name,course_language,course_description,course_subject,
      course_branch,course_trainer,course_duration,course_category}=req.body

    let data={course_name,course_id,course_language,course_trainer,
      course_duration,course_category,course_image,course_video,course_branch,course_subject,course_description}
    console.log(data);
    
  //   console.log(typeof course_subject);
 let data1=await CourseSchema.updateOne({_id:req.params.id},{$set:data})
 res.status(201).json({success:true,message:'sucess',data1})
      
  } catch (err) {
      console.log(err);
      // next(new ErrorResponse('hi',500))
      // next(err) //another way
  }
}
exports.allcourse=async (req,res)=>{
  let data=await CourseSchema.find({}).lean()
  res.status(201).json({success:true,message:'sucess',data})
}

exports.fetchOne=async(req,res)=>{
  try {
    let data=await CourseSchema.findOne({_id:req.params.id})
    res.status(201).json({success:true,message:'sucess',data})
  } catch (err) {
    console.log(err);
    
  }
}
exports.deleteOne=async(req,res)=>{
  try {
    await CourseSchema.deleteOne({_id:req.params.id})
    res.status(201).json({success:true,message:'sucess'})
  } catch (err) {
    console.log(err);
    
  }
}