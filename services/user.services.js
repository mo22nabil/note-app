const userModel = require("../models/user.model");
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const CryptoJS = require("crypto-js");


module.exports.signup = async (req, res) => {
    const {name,email,password,phone} = req.body;
    
        let user =await userModel.findOne({email});
        if (user) {
            res.json({message:"email already exist"})
        } else {
            
            await userModel.insertMany({name,email,password ,phone})
            res.json({message:"success"})
        }
        
}


module.exports.signin  = async (req,res)=>{
    const {email,password} = req.body;
    let user = await userModel.findOne({email});
    if (user) {
        const match = await bcrypt.compare(password, user.password);

        if(match) {
            const token = jwt.sign({id:user._id,name:user.name,isLoggedIn:true},process.env.tokenSignature,{expiresIn:"1h"})
            res.json({message:"Done",token});
        }
        else{
            res.json({message:"password is not correct"})
        }
    } else {
        res.json({message:"email dosnt exist"})
    }
}



module.exports.profile = async(req,res)=>{

    try {
        
        let user = await userModel.findById(req.user._id);
        console.log(user.phone);
        user.phone  = CryptoJS.AES.decrypt(user.phone, process.env.encryptKey).toString(CryptoJS.enc.Utf8);
        res.json({message:"Done", user});
    } catch (error) {
        res.json({message:"catch error",err:error});
        
    }
}