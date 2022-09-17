const {studentRegisterController,StudentdeleteController}=require('../controller/studentController')
const express=require('express')
const router=express.Router()


router.post('/student',studentRegisterController)
router.get('/:studentdelete',StudentdeleteController)

module.exports=router