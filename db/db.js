const { connect } = require('mongoose')

function dbConnexion() {
    connect("mongodb://localhost:27017/API_Tricount")
        .then(
            () => console.log('Connexion à la base de donnée')
        )
        .catch(
            error => console.log(error)
        )
}

module.exports = dbConnexion