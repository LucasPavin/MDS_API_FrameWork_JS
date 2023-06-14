// La bibliothèque joi permet de valider les données
const joi = require("joi")

/** On donne des restritions à nos attributs on définit le type, le min et le
 * max, on supprime les blancs, et s'il est obligatoire ou non
 * On le fait pour l'inscription et pour la connexion
*/
function userValidation(body){
    const userValidationSignUp = joi.object({
        firstname : joi.string().min(2).max(30).trim().required(),
        lastname : joi.string().min(2).max(30).trim().required(),
        email : joi.string().email().trim().required(),
        password : joi.string().min(8).required(),
    })

    const userValidationLogin = joi.object ({
        email : joi.string().email().trim().required(),
        password : joi.string().min(8).required(),
    })
    
    return {
        userValidationSignUp : userValidationSignUp.validate(body),
        userValidationLogin : userValidationLogin.validate(body)
    }
}  
module.exports = userValidation