const mongoose = require("mongoose")
// Va se charger de rendre les e-mails unique.
const uniqueValidator = require('mongoose-unique-validator')
// Model permettant la création et la connexion d'utilisateur.
const userSchema = mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true, unique : true},
    password: {type: String, required: true},
    date: {type: Date, default : Date.now},
})
// On utilise le plugin mongoose-unique-validator pour permettre de rendre une adresse mail unique. 
mongoose.plugin(uniqueValidator)

module.exports = mongoose.model('user', userSchema)