// const jwt=require('jsonwebtoken');
// const jwtToken=(userId,res)=>{
//     const token=jwt.sign({userId},process.env.JWT,{
//         expiresIn:'30d'
//     })
//     // res.cookie('jwt',token,{
//     //     maxAge:30 * 24 *60 *60 *1000,
//     //     httpOnly:true,
//     //     sameSite:"strict",
//     //     secure:process.env.SECURE !== "development"
//     // })
//     // res.cookie('jwt', token, {
//     //     maxAge: 30 * 24 * 60 * 60 * 1000,
//     //     httpOnly: true,
//     //     sameSite: "none",  // Changed from "strict" to "none"
//     //     secure: true       // Set to true when on Render (using HTTPS)
//     // });
// const isProduction=process.env.NODE_ENV === 'production';
//     res.cookie('jwt',token,{
//         maxAge: 30 * 24 * 60 * 60 * 1000,
//         httpOnly: true,
//         secure: isProduction, // True in production
//         sameSite: isProduction ? 'none' : 'lax'
//     })

// }

// module.exports={jwtToken} 
const jwt = require('jsonwebtoken');

const jwtToken = (userId) => {
    // Generate token but don't set cookie
    const token = jwt.sign({ userId }, process.env.JWT, {
        expiresIn: '30d'
    });
    
    // Just return the token
    return token;
};

module.exports = { jwtToken };