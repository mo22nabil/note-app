const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");


const userRole = {
    Admin:"Admin",
    user:"user",
    hr:"hr"
    
}

const auth=(data)=>{


    return async (req,res,next)=>{
        
            
            const headerToken = req.headers['authorization'];
            if (!headerToken || headerToken.length == 0 || headerToken == undefined || headerToken==null ||!headerToken.startsWith(`${process.env.bearerToken} `) ) {
                res.json({message:"in-valaid headerToken bearer"})
            } else {

                const token = headerToken.split(' ')[1];
                
                if (!token ||token.length == 0 || token==undefined || token==null) {
                    res.json({message:"in valid token"})
                } else {
                    
                    jwt.verify(token, process.env.tokenSignature,async (err, decoded)=>{
                        if (err) {
                            res.json({message:"virefy error token",err})
                            
                        } else {
                            
                            const findUser = await userModel.findById(decoded.id).select("email name role")
                            if (!findUser) {
                                res.json({message:"in-valaid loggin user id"})
                            } else {
                                if (data.includes(findUser.role)) {
                                    req.user=findUser
                                    next();
                                } else {
                                    res.json({message:"sorry you are not authorized"})
                                }
                            }
                        }
                    });
                }
            }
    }
}
module.exports = {auth,userRole}