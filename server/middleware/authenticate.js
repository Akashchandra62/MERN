const jwt = require('jsonwebtoken');
const  User  = require('../model/userSchema');


const authenticate = async (req, res, next)=>{
    try{

        const token = req.cookies.jwtToken;
        const verifyToken =  jwt.verify(token, "SecretKey");
        // console.log("verify token : " +  verifyToken._id);

        const rootUser = await User.findOne({_id:verifyToken._id, "tokens.token":token})
        if(!rootUser){ throw new Error("User not found")}
        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;
        next();

    }catch(err){
        res.status(400).json({"error" : "Login to continue"});
    }
    next()

}


module.exports = authenticate