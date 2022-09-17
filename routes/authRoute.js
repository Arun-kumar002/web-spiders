const express=require('express')
const router=express.Router()
const {registerController,signinController,logoutController,userAuth}=require('../controller/authcontroller')
const {protected,authorizeduser}=require('../helpers/authProtector')




//access public
//@HtTP method post
//@ url /api/auth/register 
router.post('/register',registerController)

//access public
//@HtTP method post
//@ url /api/auth/signin 
router.post('/sign',userAuth,signinController)

router.get('/logout',protected,authorizeduser('user'),logoutController)


module.exports=router;