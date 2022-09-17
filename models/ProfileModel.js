const {Schema,model}=require('mongoose')
const ProfileSchema=new Schema({
 user:{
    type:Schema.Types.ObjectId,
    ref:"auth"  ,//population
  
 },
 firstname:{
   type:String,
   required:[true,"first name is req"]
 },
 lastname:{
    type:String,
    required:[true,"last name is req"]
 },
 phone:{
    type:String,
    required:[true," number is req"]
 },
 address:{
    type:String,
    required:[true,"address is req"]
 },
 dob:{
    type:String,
    required:[true,"dob is req"]
 },
 city:{
    type:String,
    required:[true,"city name is req"]
 },
 gender:{
    type:String,
    enum:['male','female','others'],
 },
 photo:{
    type:[''],
    default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvIFhtkP1KVLsieF9iXxl1HN63NJSdNcbzFOkLztujFA&s'

 },
 purchasecourse:{
   type:['']
 }

})

module.exports=model('userprofile',ProfileSchema)