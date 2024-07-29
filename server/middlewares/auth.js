const jwt = require("jsonwebtoken");
require("dotenv").config();

//For Authentication middleware
exports.auth = async(req,res,next)=>{
    try
    {
        // fecth token from req and authorize it
        const token = req.cookies.jwt 
                      || req.body.token 
                      || req.header("Authorization").replace("Bearer ","");

        console.log("Token of userrr : ", token);
        if(!token)
        {
            res.status(401).json({
                success:false,
                message:"Token Missing",
            });
        }
        // verify this token 
        try
        {
            const decode  = jwt.verify(token, process.env.JWT_SECRET);
            req.user =decode;
            console.log("User type : ",req.user.accountType);

        }catch(err)
        {
            res.status(500).json({
                success:false,
                message:"Token is invalid brother ",
            })
        }

        next();
     
    }catch(err)
    {
        res.status(500).json({
            success:false,
            message:"Internal sever error in auth middleware"
        })   
    }
}

//is student middleware
//new try
exports.isStudent = async(req,res,next)=>{
    try
    {
        if(req.user.accountType!=="Student")
        {
            res.status(401).json({
                success:false,
                message:"This Page is protected for you. You are not Student."
            })
        }
        next();
    }catch(err)
    {
        res.status(500).json({
            success:false,
            message:"user role can not be varified"
        })
    }
}

//middleware
exports.isInstructor = async(req,res,next)=>{
    try
    {
        if(req.user.accountType!=="Instructor")
        {
            res.status(401).json({
                success:false,
                message:"This Page is protected for you. You are not Instructor."
            })
        }
        next();
    }catch(err)
    {
        res.status(500).json({
            success:false,
            message:"Internal issue in Instructor"
        })
    }
}
//middleware

exports.isAdmin = async(req,res,next)=>{
    try
    {
        if(req.user.accountType!=="Admin")
        {
            res.status(401).json({
                success:false,
                message:"This Page is protected for you. You are not Admin"
            })
        }
        next();

    }catch(err)
    {
        res.status(500).json({
            success:false,
            message:"Internal issue in Admin"
        })
    }
}