const Joi = require("joi");

const addNoteValidator = {
    body : Joi.object().required().keys({
        title:Joi.string().min(5).max(30).required(),
        desc:Joi.string().min(20).max(5000).required()
    })
}
const updateNoteValidator = {
    body : Joi.object().required().keys({
        title:Joi.string().min(5).max(30).required(),
        desc:Joi.string().min(20).max(5000).required()
    }),
    params:Joi.object().required().keys({
        id:Joi.string().min(24).max(24).required()
    })
}

module.exports = {
    addNoteValidator,
    updateNoteValidator
}