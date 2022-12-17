const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://deokminleeP6:deokminleeP6@cluster0.vzhxams.mongodb.net/test',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Configurer une réponse pour vérifier si cela fonctionne
app.use((req, res) => {
    res.json({ message : 'Requête bien reçue'})
});



module.exports = app;