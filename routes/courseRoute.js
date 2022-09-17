const express=require('express')

const{courseController,editController,fetchOne,deleteOne,allcourse}=require('../controller/courseController')
const multer=require('multer')
const {storage}=require('../middlewares/multer')
let upload=multer({storage})
const {protected,authorizeduser}=require('../helpers/authProtector')

const router=express.Router()
router.get('/all',protected,authorizeduser('user','admin'),allcourse)
router.get('/getonecourse/:id',fetchOne)
router.post('/create-course',upload.any(['course_image','course_video']),protected,courseController)

router.put('/change/:id',upload.any(['course_image','course_video']),protected,editController)
router.delete('/delete/:id',deleteOne)

module.exports=router;
