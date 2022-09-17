const {Schema,model}=require('mongoose')
const StudentSchema=new Schema({
    studentname:{
        type:String,
        required:[true,'student name is required']
    },
    studentemail:{
        type:String,
        required:[true,'student email is required']
    },
    studentmobile:{
        type:String,
        required:[true,'student mobile is required']
    },
    studentedu:{
        type:String,
        required:[true,'student edu is required']
    },
    studentpreferedcourse:{
        type:String,
        required:[true,'student prefered course is required']
    },
    studentpreferedbranch:{
        type:String,
        required:[true,'student preferedbranch is required']
    }

})

module.exports=model('studentDetails',StudentSchema);