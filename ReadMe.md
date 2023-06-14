# LUCAS PAVIN évaluation coté BACK-END

## Choix de la techno

Pour le côte du back-end, j'ai utilisé le framework node.js, j'ai ensuite été sur une base de donnée MongoDB puisque c'est du NoSQL donc les données sont stockés sous-forme JSON, et on a la possbilité d'utiliser les schémas de MongoDB ce qui permettra pouvoir mieux gérer les modifications.

J'ai utilisé Bcrypt afin de venir hasher les mots de passe de mes utilisateurs, ce qui donnera donc des mots de passes cryptés et donc plus difficile à connaître.

Pour de la sécurité j'ai utilisé les JSonWebToken qui sont générés lors de la connexion d'un utilisateur et qui sera unique à cette utilisateur, et cela permettra de pouvoir effectuer des actions de créations, modification ou suppression seulement si c'est la personne est belle et bien connectée.

Nodemon lui permet de relancer à chaque modification le serveur sans devoir le redémarrer manuellement.

Express va venir rendre plus facile la création du serveur web, et donc également la gestion des routes, des requêtes HTTP et des leurs réponses.

## Installation

```npm init -y```

```npm i express```

```npm i -D nodemon```

Pour lancer le serveur fait dans le terminal :

```
nodemon index.js
```

Si nodemon ne se lance pas, rendez-vous dans le package.json et ajouter dans script {} :
```"dev": "nodemon index.js"```

Pour installer les e-mails unique :
-> npm i mongoose-unique-validator
Pour installer les JSonWebToken:
```npm i jsonwebtoken```

Pour installer passport :
```npm i passport passport-jwt```
