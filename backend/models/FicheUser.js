// Ici pour interagir avec la database.
// importation de mongoose
const mongoose = require('mongoose');

// le models : donnée utilisateur pour la page du frontend
const Schema = mongoose.Schema(
    {
        userId : { 
            type: String, required: true
        },
        name : { 
            type: String, 
            required : [true, "Le nom de la sauce est requis"]
        },
        manufacturer : { 
            type: String, 

        },
        description : { 
            type: String,
            required : [true, "La description de la sauce est requis"]
        },
        mainPepper : { 
            type: String,
            required : [true, "Le principal ingrédient de la sauce est requis"]
        },
        imageUrl : { 
            type: String,
            required : [true, "L\'image de la sauce est requise "]
        },
        heat : { 
            type : Number,
            required: [true, 'La puissance de la sauce est requise'] 
        },
        likes : { 
            type : Number,
            required : false,
            defaut: 0
        },
        dislikes : { 
            type : Number,
            required : false,
            defaut: 0
        },
        usersLiked : { 
            type : [String], 
            required: false
        },
        usersDisliked : { 
            type : [String], 
            required: false
        },
    },
        //timestamp
        {
            timestamps: true
        }
);


// Exportation du module
module.exports = mongoose.model('Sauce', Schema);




