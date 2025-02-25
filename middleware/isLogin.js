// const jwt=require('jsonwebtoken');
// const {User}=require('../models/userModel.js')


// const isLogin=(req,res,next)=>{
//     try{
//         const token=req.cookies.jwt;
//         // console.log(token);
//         if(!token)
//         {
//             return res.status(200).json({success:false,message:"User unauthorize"})
//         }
//         const decode=jwt.verify(token,process.env.JWT)
//         if(!decode)
//             {
//                 return res.status(200).json({success:false,message:"User unauthorize -invalid token"})
//             }
//             const user= User.findById(decode.userId).select("-password");
//             if(!user)
//                 {
//                     return res.status(200).json({success:false,message:"User not found"})
//                 }
//                 req.user=user;
//                 next()
//     }catch(error)
//     {
// console.log(`error is in islogin middleware ${error.message}`)
// return res.status(200).json({success:false,message:error})
//     }
// }
// module.exports={isLogin}


const jwt = require('jsonwebtoken');
const { User } = require('../models/userModel.js');

const isLogin = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        console.log("isLogin - token from cookie:", token); // *** ADD THIS ***

        if (!token) {
            console.log("isLogin - No token found"); // *** ADD THIS ***
            return res.status(401).json({ success: false, message: "User unauthorized - No token" }); // Changed to 401
        }

        let decode; // Declare decode outside the try block
        try {
            decode = jwt.verify(token, process.env.JWT);
            console.log("isLogin - decoded token:", decode); // *** ADD THIS ***
        } catch (jwtError) {
            console.log("isLogin - JWT verification error:", jwtError.message); // *** ADD THIS ***
            return res.status(401).json({ success: false, message: "User unauthorized - Invalid token" }); // Changed to 401
        }

        if (!decode) {
            console.log("isLogin - Decode is null/undefined"); // *** ADD THIS ***
            return res.status(401).json({ success: false, message: "User unauthorized - Invalid token" }); // Changed to 401
        }

        try {
            const user = await User.findById(decode.userId).select("-password");
            console.log("isLogin - User found:", user); // *** ADD THIS ***

            if (!user) {
                console.log("isLogin - User not found in DB"); // *** ADD THIS ***
                return res.status(404).json({ success: false, message: "User not found" }); // Changed to 404
            }

            req.user = user;
            console.log("isLogin - req.user:", req.user); // *** ADD THIS ***
            next();
        } catch (dbError) {
            console.error("isLogin - Database error:", dbError);
            return res.status(500).json({ success: false, message: "Database error" }); // Changed to 500
        }

    } catch (error) {
        console.error(`isLogin - Error in isLogin middleware: ${error.message}`);
        return res.status(500).json({ success: false, message: "Internal server error" }); // Changed to 500
    }
};

module.exports = { isLogin };



// const jwt = require('jsonwebtoken');
// const { User } = require('../models/userModel.js');

// const isLogin = async (req, res, next) => {
//     try {
//         const token = req.cookies.jwt;
//         console.log("isLogin - token from cookie:", token);

//         if (!token) {
//             console.log("isLogin - No token found");
//             return res.status(401).json({ success: false, error: "Authentication failed", message: "No token provided" });
//         }

//         try {
//             const decode = jwt.verify(token, process.env.JWT);
//             console.log("isLogin - decoded token:", decode);

//             const user = await User.findById(decode.userId).select("-password");
//             console.log("isLogin - User found:", user);

//             if (!user) {
//                 console.log("isLogin - User not found in DB");
//                 return res.status(404).json({ success: false, error: "Authentication failed", message: "User not found" });
//             }

//             req.user = user;
//             console.log("isLogin - req.user:", req.user);
//             next();

//         } catch (jwtError) {
//             console.log("isLogin - JWT verification error:", jwtError.message);
//             return res.status(401).json({ success: false, error: "Authentication failed", message: "Invalid token" });
//         }


//     } catch (error) {
//         console.error(`isLogin - Error in isLogin middleware: ${error.message}`);
//         return res.status(500).json({ success: false, error: "Internal server error", message: "Internal server error" });
//     }
// };

// module.exports = { isLogin };
