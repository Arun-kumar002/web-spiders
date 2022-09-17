const {Schema,model}=require('mongoose')

const CourseSchema=new Schema({

    course_name:{
        type:String,
        required:[true,"course name is requires"]
    },
    course_id:{
        type:String,
        required:[true,"course id is requires"]
    },
    course_language:{
        type:String,
        required:[true,"course language is requires"]
    },
    course_trainer:{
        type:String,
        required:[true,"course trainer is requires"]
    },
    course_duration:{
        type:String,
        required:[true,"course duration is requires"]
    },
    course_category:{
        type:String,
        enum:["web development","java development","python development","backend development","ui development","automation testing"],
        required:[true,"course name is requires"],
        default:"web development"
    },
    course_date:{
        type:String,
        default:Date.now()
    },
    course_image:{
        type:[''],
        // required:[true,"course img is required"],
        // default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe0JaOOeJrzk9UUB5rejDFbb_Al0z7JZWk783NOkyonw&s"
    },
    course_video:{
        type:[''],
    },
    course_branch:{
        type:String,
        // enum:["basavanagudi","rajajinagar","btm layout","JNTU","old air port"],
        // required:[true,"course branch is requires"],
        // default:"basavanagudi"
    },
    course_timings:{
        type:String,
        default:Date.now()
    },
    course_subjects:{
        type:String,
        // enum:["java","javascript","python","selenium","manual testing","api testing","web services","unit testing","socket","nodejs","express"],
        // required:[true,"course subjects is requires"],
        // default:"js"
    },
    course_description:{
        type:String,
        // required:[true,"course description is required"],
    },
    student:{
        type:['']
    }
},{timestamps:true})

module.exports=model("courses",CourseSchema)