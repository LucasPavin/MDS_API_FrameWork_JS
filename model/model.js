const mongoose = require("mongoose")
// Va se charger de rendre les e-mails unique.
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true, unique : true},
    password: {type: String, required: true},
    date: {type: Date, default : Date.now},
})

mongoose.plugin(uniqueValidator)

module.exports = mongoose.model('user', userSchema)