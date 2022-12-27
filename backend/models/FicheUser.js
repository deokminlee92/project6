// Ici pour interagir avec la database.
// importation de mongoose
const mongoose = require('mongoose');

// le models : donnée utilisateur pour la page du frontend
const Schema = mongoose.Schema({
    userId : { type: String, required: true},
    nom : { type: String, required : true},
    prenom : { type: String, required : true},
    age : { type: Number, required : true},
    photoProfilUrl : { type: String, required : true}
});


// Exportation du module
// "fiche_user" : ce sera le nom du fichier qui sera créé dans MongoDB
module.exports = mongoose.model('fiche_user', Schema);




