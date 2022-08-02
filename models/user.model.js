const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const CryptoJS = require("crypto-js");



const userSchema = mongoose.Schema({
    name:String,
    email:{type:String,unique:true},
    password:String,
    phone:String,
    role:{type:String , default:'user'}
},{timestamps:true})

userSchema.pre('insertMany' ,async function (next,docs){
    console.log(docs);
    docs.password = await bcrypt.hash(docs.password ,parseInt(process.env.saltRounds));
    docs.phone =  CryptoJS.AES.encrypt(docs.phone, process.env.encryptKey).toString();
    console.log(docs);
    next();
})

module.exports =  mongoose.model('user',userSchema)