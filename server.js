const express =require('express');
const {engine}=require('express-handlebars')
const app=express()
const Handlebars=require('handlebars');
const methodOverride=require('method-override');
const morgan=require('morgan')
const {success,error,info}=require('consola')
const connectDb=require('./config/db')
const {PORT,NODE_ENV}=require('./config/index')
const errorHandler=require('./middlewares/errorhandling')
//router catch section starts here
const courseRoute=require('./routes/courseRoute')
const authRoute=require('./routes/authRoute')
const profileRoute=require('./routes/profileRoute')
const StudentRoute=require('./routes/studentRoute')
const cookieparse=require('cookie-parser')
const passport=require('passport')
//router catch section ends here
require("./middlewares/passport")(passport);

//middleware section starts here



//method override


//middleware section ends here




//base url starts here

//base url ends here



//mount section starts here


//mount section ends here






//node js server starts here
let starsserver=async()=>{
    try {
        connectDb()
        if(NODE_ENV === "development"){
            app.use(morgan("dev"))
        }
        //mount route always above
        
        app.use(express.urlencoded({extended:true}))
        app.use(express.json({extended:true}))
        app.use(cookieparse())
        app.use(passport.initialize())
        app.use('/api/course',courseRoute)
        app.use('/api/auth',authRoute)
        app.use('/api/profile',profileRoute)
        app.use('/api',StudentRoute)
        //error middleware section always below
        app.use(errorHandler)
        app.listen(PORT,err=>{
            if(err) throw err;
            info(`web spider app running on ${PORT}`)
        })
    } catch (error) {
        console.log(error);
    }
}
starsserver()
//node js server ends here