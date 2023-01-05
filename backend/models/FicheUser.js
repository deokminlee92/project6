// Ici pour interagir avec la database.
// importation de mongoose
const mongoose = require('mongoose');

// le models : donnée utilisateur pour la page du frontend
const Schema = mongoose.Schema({
    userId : { type: String, required: true},
    name : { type: String, required : true},
    manufacturer : { type: String, required : true},
    description : { type: String, required : true},
    mainPepper : { type: String, required : true},
    imageUrl : { type: String, required : true},
    heat : { type : Number, required : true},
    likes : { type : Number, defaut: 0},
    dislikes : { type : Number, defaut : 0},
    usersLiked : { type : [String]},
    usersDisliked : { type : [String]}
});


// Exportation du module
module.exports = mongoose.model('Sauce', Schema);




