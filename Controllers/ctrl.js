const express = require('express')
const User = require('../model/model')
const userValidation = require('../validation/validation')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')


/**
 * Fonction qui va nous permettre de nous inscrire
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

exports.inscription = (req, res) => {
    // Récupérer les données 
    const {body } = req;
    
    // Valider les données
    const {error} = userValidation(body).userValidationSignUp
    if(error) return res.status(401).json(error.details[0].message) 
    
    // Hash du mot de passe
    bcrypt.hash(body.password, 12)
        .then(
            hash => {
                // En cas d'erreur on renvoie un message d'erreur
                if(!hash) {
                    return res.status(500).json({msg: "Erreur du serveur"})
                }
                delete body.password;
                // Création du User
                new User({ ...body, password: hash})
                .save() 
                .then((user) => {
                    console.log(user)
                    res.status(201).json({'msg': 'Utilisateur crée'})
                })
                .catch((error) => res.status(500).json(error))
            }
        )
        .catch((error) => res.status(500).json(error))
    
}
/**
 * Fonction qui va nous permettre de nous connecter
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

exports.connexion = (req, res) => {

    const { email, password } = req.body

    // Validation des données
    const { error } = userValidation(req.body).userValidationLogin
    if(error) return res.status(401).json(error.details[0].message)

    // Trouver le bon user dans la base de données.
    User.findOne({ email : email })
        .then((user) => {
            if(!user) return res.status(404).json({ msg: 'Utilisateur pas trouvé'})

            // Verification de la compatibilité du mot de passe.
            bcrypt.compare(password, user.password)
                .then(match => {
                    if(!match) return res.status(500).json({ msg: 'Problème de serveur'})

                    // Token d'auth
                    res.status(200).json({
                        email: user.email,
                        id: user._id,
                        token: jwt.sign({id: user._id}, "SECRET_KEY", {expiresIn: "12h"})
                    })

                })
                .catch((error) => res.status(500).json(error))
        } )
        // Correspond pas à l'erreur de si on ne trouve pas l'email
        .catch((error) => res.status(500).json(error))
}
  