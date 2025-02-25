const jwt=require('jsonwebtoken');
const jwtToken=(userId,res)=>{
    const token=jwt.sign({userId},process.env.JWT,{
        expiresIn:'30d'
    })
    // res.cookie('jwt',token,{
    //     maxAge:30 * 24 *60 *60 *1000,
    //     httpOnly:true,
    //     sameSite:"strict",
    //     secure:process.env.SECURE !== "development"
    // })
    res.cookie('jwt', token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "none",  // Changed from "strict" to "none"
        secure: true       // Set to true when on Render (using HTTPS)
    });
}

module.exports={jwtToken}