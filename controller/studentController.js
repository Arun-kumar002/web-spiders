const ErrorResponse=require('../utils/ErrorResponse')
const StudentSchema=require('../models/StudentModel')
const CourseSchema=require('../models/courseModel')

exports.studentRegisterController=async(req,res,next)=>{
    try {
        let check= await CourseSchema.findOne({course_name:req.body.studentpreferedcourse}).lean()
        if(!check){
            res.end('course not present ')
        }
        let course= await CourseSchema.updateOne({course_name:req.body.studentpreferedcourse},{$push:{student:req.body}}).lean()
       
        let payload=await StudentSchema(req.body).save()
        res.status(200).json({success:true,message:'student respose captured',payload})
    } catch (error) {
        console.log(error);
        res.end('ok')
     }
}
exports.StudentdeleteController=async(req,res,next)=>{
    try {
        console.log(req.params.studentdelete);
        let payload=await CourseSchema.updateOne({student:{$elemMatch:{studentname:req.params.studentdelete}}},{$pull:{student:{studentname:req.params.studentdelete}}})
        let profile=await StudentSchema.deleteOne({studentname:req.params.studentdelete})
        res.status(200).json({success:true,message:'student deleted',payload,profile})
    } catch (error) {
        console.log(error);
    }

}
