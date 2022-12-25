// Ici pour interagir avec la database.
// Envoyer dans la base de données d'une collection user(email,mdp) 

// importation de mongoose
const mongoose = require('mongoose');

// Importation uniqueValidator 
const uniqueValidator = require('mongoose-unique-validator');

// Le modèle de base de données pour le signup , pour enregistrer un nouvel utilisateur
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true}
});

//Pour ne pas enregistrer 2 fois la même adresse email dans la database
//méthode : plugin 
//argument : uniqueValidator 
userSchema.plugin(uniqueValidator);

// Exportation du module
// model(name:'string', schema)
module.exports = mongoose.model('User', userSchema);





