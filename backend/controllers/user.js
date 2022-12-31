// c'est ici le code JS va être exécuté et permet d'intéragir avec la database

//Importation models de la base de donnée User.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Importation de crypto-js pour chiffrer l'adresse e-mail
const cryptojs = require('crypto-js');

// Importation pour utilisation des varaibles d'environnements
const dotenv = require('dotenv')
const result = dotenv.config();

//2 fonctions de middleware,
// pour enregistrement de nouveau utilisateur 'signup
// export. : pour exporter cette fonction pour récupérer dans models/User.js

exports.signup = (req, res, next) => {

//Chiffrer l'email avant de l'envoyer dans la database
// Package cryptojs + algorithme HmacSHA256 
const emailCryptoJs = cryptojs.HmacSHA256(req.body.email, `${process.env.CRYPTOJS_EMAIL}`).toString();
console.log("-----> Contenu emailCryptoJs");
console.log(emailCryptoJs);

//Hachage, le MDP avant de l'envoyer dans la database
//Salt : 10 fois sera exécuté l'algorithme de hachage
bcrypt.hash(req.body.password, 10)
    .then((hash) => {
        //ce qui va être enregistré dans MongoDB
        const user = new User({
            email: emailCryptoJs,
            password : hash
        });
    console.log("user");
    console.log(user);

    //Envoyer le user dans la dabatas MongoDB
    user.save()
        .then( () => res.status(200).json({message: "Utilisateur crée !"}))
        .catch(error => res.status(400).json({ error}));
    })
        .catch(error => res.status(500).json({error}));
};


// fonction 'login' pour connecter l'utilsateur existant
exports.login = (req, res, next) => {
//le contenu de la requête
console.log("Login req.body.password");
console.log("Login req.body.email");
console.log(req.body.email);
console.log(req.body.password);

//Chiffrer l'email de la requête 
const emailCryptoJs = cryptojs.HmacSHA256(req.body.email, `${process.env.CRYPTOJS_EMAIL}`).toString();

//Chercher dans la base de donnée si l'utilisateur existe
// forma JSON {}
User.findOne({email : emailCryptoJs })
    //Si le mail de l'utilisateur n'est pas présent, il n'exsite pas
    .then((user) => {
        console.log("Contenu de user du then de User.findOne()");
        console.log(user);

        //fonction inverse
        if(!user){
            return res.status(401).json({error : "Utilisateur inexistant"})
        } 
        //Contrôler la validité du password envoer par le front
        //Comparer le MDP envoyé par le front et le MDP haché dans la database
        bcrypt.compare(req.body.password, user.password)
        .then((controlPassword) => {
            console.log("controlPassword");
            console.log(controlPassword);

            //Si le MDP est incorrect
            if(!controlPassword){
                return res.status(401).json({error : "MDP est incorrect"})
            }

            //Si le MDP est correct, on envoie userID et Token
            // Envoie dans la response du serveur du usrId et du token d'authentification
            res.status(200).json({
                //encodage du suerId pour la création de nouveau objet(objet et userId seront liées)
                userId : user._id,
                token : jwt.sign(
                    // trois arguments
                    {userId : user._id},
                    `${process.env.JWT_KEY_TOKEN}`,
                    {expiresIn : "10h" }
                ) 
            })
        })
        .catch(() => res.status(500).json({error}));

    })
    .catch(() => res.status(500).json({error}));
};
