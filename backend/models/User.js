// importation de mongoose
const mongoose = require('mongoose');

// Importation uniqueValidator 
const uniqueValidator = require('mongoose-unique-validator');

// Le modèle de base de données pour le signup , pour enregistrer un nouvel utilisateur
const userSchema = mongoose.Schema({
    email: { 
            type: String, 
            required: [true, "Email requis"], 
            unique: true
        },
    password: { 
        type: String, 
        required: [true, "MDP requis"]
    }
});

//Pour ne pas enregistrer 2 fois la même adresse email dans la database
//méthode : plugin 
//argument : uniqueValidator 
userSchema.plugin(uniqueValidator);

// Exportation du module
module.exports = mongoose.model('User', userSchema);





