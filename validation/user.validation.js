const Joi = require("joi");

const signUpValidator ={
    body:Joi.object().required().keys({
         name:Joi.string().min(3).max(30).required().messages({
             'string.empty':"plz fill in your name",
             'any.required':"plz send your name",
             'string.base':"plz entre string"
         }),
         email:Joi.string().email().required(),
         password:Joi.string().pattern(new 
            RegExp('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')) .required(),
         cpassword:Joi.string().valid(Joi.ref('password')).required(),
         phone:Joi.number().required()
    })
}

const signInValidator = {
    body:Joi.object().required().keys({
        email:Joi.string().email().required(),
        password:Joi.string().pattern(new 
           RegExp('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')) .required()
    })
}

module.exports = {signUpValidator,signInValidator}