const express=require('express')
const router=express.Router()
const {getprofileController,creatProfileController,getMe,purchaseController}=require('../controller/profileController')
const {protected,authorizeduser}=require('../helpers/authProtector')
const role=require('../helpers/rolebased')

router.get('/',protected,role,getprofileController)
router.post('/new',protected,creatProfileController)
router.get('/populate',protected,authorizeduser('user'),getMe)
router.post('/purchase',protected,purchaseController)
module.exports=router;