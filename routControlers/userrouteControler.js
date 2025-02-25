const {User}=require('../models/userModel.js')
const bcrypt=require('bcrypt');
const {jwtToken}=require('../utils/jwtwebToken.js');
const router = require('../routes/authUser.js');
const userRegister=async(req,res)=>{
    try{
        const {fullname,username,email,password,gender,profilepic}=req.body;
        const user=await User.findOne({username,email})
        if(user){
            return res.status(500).json({success:false,message:"username and email already exixt"});
        }
        const hashPassword=bcrypt.hashSync(password,10);
        // const profileBoy=profilepic || `https://avtar.iran.run/public/boy?username=${username}`;
        const profileBoy=profilepic || `https://avatar.iran.liara.run/public/boy?username=${username}`;
        
        const profileGirl=profilepic || `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser=new User ({
            fullname,
            username,
            email,
            password:hashPassword,
            gender,
            profilepic:gender==="male"?profileBoy:profileGirl
        })
await newUser.save();
jwtToken(newUser._id,res)
       if(newUser){
         await newUser.save();
         jwtToken(newUser._id,res)
       }
       else{
        return res.status(500).json({success:false,message:"invalid user data"});
       }

       res.status(201).json({
        _id:newUser._id,
        fullname:newUser.fullname,
        username:newUser.username,
        profilepic:newUser.profilepic,
        email:newUser.email
       })

    }catch(error){
      res.status(500).json({
            success:false,
            message:error
        })
        console.log(error);
    }
}




const userLogin=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email})
        if(!user){
            return res.status(500).json({success:false,message:"User already exist"});
        }
       const comparepass=bcrypt.compareSync(password,user.password)
       if(!comparepass){
        return res.status(500).json({success:false,message:"Email & password does not match"});
    }
   
        

       jwtToken(user._id,res)
       res.status(201).json({
        _id:user._id,
        fullname:user.fullname,
        username:user.username,
        profilepic:user.profilepic,
        email:user.email,
        message:"Login successfully..."
       })

    }catch(error){
      res.status(500).json({
            success:false,
            message:error
        })
        console.log(error);
    }
}

const userLogout=async(req,res)=>{
    try{
res.cookie("jwt",'',{
    maxAge:0
})
res.status(200).json({message:"Logout successfully"})
    }
    catch(error){
        res.status(500).json({
              success:false,
              message:error
          })
          console.log(error);
      }
}

module.exports = { userRegister,userLogin ,userLogout};