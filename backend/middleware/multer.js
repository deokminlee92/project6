// //JS174, Solus auth avec form-data Postman

// // multer : pour gérer les requête HTTP avec envoie de fichier
// const multer = require('multer');

// // le dictionnaire de MIME TYPES
// const MIME_TYPES = {
//     'image/jpg': 'jpg',
//     'image/jpeg': 'jpg',
//     'image/png': 'png'
// };

// // la destination du fichier(repertoire) et générer un nom de fichier unique
// const storage = multer.diskStorage({
//     // la destination de stockage du fichier
//     destination : (req, file, callback) => {
//         callback(null, 'images');
//     },
//     filename : (req, file, callback) => {
//         //supprimer les espaces dans le nom du fichier
//         const name = file.originalname.split(' ').join('_');
//         const extension = MIME_TYPES[file.mimetype];

//         //Recréer le nom du fichier envoyé
//         //Date.now() envoie le nombre de milleseconde depuis....
//         callback(null, name + "_" + Date.now() + "." + extension);
//     }
// });

// // exportation du middleware multer
// module.exports = multer({storage}).single("image");