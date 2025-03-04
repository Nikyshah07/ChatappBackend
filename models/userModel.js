const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        
    },
    email:{
        type:String,
        required:true,
        
    },
    gender:{
        type:String,
        required:true,
        enum:["male","female"]
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    profilepic:{
        type:String,
        required:true,
        default:""
    }
},{timestamps:true})
const User=mongoose.model("User",userSchema)
module.exports = { User };