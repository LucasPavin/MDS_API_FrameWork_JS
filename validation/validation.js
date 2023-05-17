const joi = require("joi")

function userValidation(body){
    const userValidationSchema = joi.object({
        firstname : joi.string().min(2).max(30).trim().required(),
        lastname : joi.string().min(2).max(30).trim().required(),
        email : joi.string().email().trim().required(),
        password : joi.string().min(8).required(),
    })

    return userValidationSchema.validate(body)
}  
module.exports = userValidation