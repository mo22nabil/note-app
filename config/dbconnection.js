const mongoose = require("mongoose");


module.exports.dbconnection = ()=>{
    mongoose.connect(process.env.DBCONNECTION).then(()=>{
        console.log('db connected');
    }).catch((err)=>{
        console.log("DB con error",err);
    });
}