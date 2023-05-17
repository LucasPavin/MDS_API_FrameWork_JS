const express = require('express')
const User = require('../model/model')
const userValidation = require('../validation/validation')
const bcrypt = require("bcrypt")

/**
 * Fonction qui va nous permettre de nous inscrireà
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

exports.inscription = (req, res) => {
    // Récupérer les données 
    const {body } = req;
    
    // Valider les données
    const {error} = userValidation(body)
    if(error) return res.status(401).json(error.details[0].message) 
    
    // Hash du mot de passe
    bcrypt.hash(body.password, 12)
        .then(
            hash => {
                // En cas d'erreur on renvoie un message d'erreur
                if(!hash) {
                    return res.status(500).json({msg: "Server Error !"})
                }
                delete body.password;
                
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

    // console.log(body)
    res.json(body)
}
/**
 * Fonction qui va nous permettre de nous connecter
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

exports.connexion = (req, res) => {
    res.send('connexion')
}