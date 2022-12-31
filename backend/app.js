// Une fois une requête passé par server.js , ici c'est pour l'application

const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
require('dotenv').config();
//Importation des routes
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/ficheUser')
// const ficheUserRoutes = require('./routes/ficheUser');

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://deokminleeP6:deokminleeP6@cluster0.vzhxams.mongodb.net/test',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//importation modules path
const path = require('path');

const app = express();
// Problème de connexion CORS, Ajouté un bloc de code ci-dessous permet d'accéder aux ressources.
// Accepter les requêtes quelle que soit l'origine
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//transformer le corps (le body) en json objet JS utilisavble
app.use(bodyParser.json());

// Gestion de la requête POST venant de l'application front-end, on extraire le corps JSON.
app.use(express.json());

//la route d'authentification
//userroutes : endpoint
app.use('/api/auth', userRoutes);

// la route de la fiche user
app.use("/api/sauces", sauceRoutes)

// la route pour accéder aux images du dossier images
app.use("/images", express.static(path.join(__dirname, "images")))

module.exports = app;