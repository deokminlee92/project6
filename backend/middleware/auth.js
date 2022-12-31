// Importation
const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY_TOKEN);
    const userId = decodedToken.userId;
    req.auth = { userId: userId };
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({error: new Error('Invalid request!')});
  }
};






// ///////////////////// JS 167 토큰 테스트  확



// // exportation de la fonction du middleware
// module.exports = (req, res, next) => {
//     try {

//     //Récupérer le token envoyé par frontend
//     //[1], pour rattrapper l'index 1 non bearer 
//     const token = req.headers.authorization.split(' ')[1];
//     console.log("---------->Token");
//     console.log(token);

//     //décoder le token
//     const decodedToken = jwt.verify(token, `${process.env.JWT_KEY_TOKEN}`);

//     console.log("------>decodedToken");
//     console.log(decodedToken);

//     console.log("---> CONTENU du req.body");
//     console.log(req.body);

//     console.log("---> req.body.userId");
//     console.log(req.body.userId);
//     console.log("---> userId");
//     console.log(userId);

//     //Comparaison du userId qu'il y a dans la req avec le userId qu'il y a dans le token
//     const userId = decodedToken.userId;
//     // Récupérer le userId qu'il y a à l'intérieur du token déchiffré et le comparer avec l'userId
//     // userId dechiffré
//     console.log("---> CONTENU : userId du decoded TOKEN");
//     console.log(userId);

//     // req.auth = { userId: userId };
//     if (req.body.userId && req.body.userId !== userId) {
//         throw 'Invalid user ID';
//       } else {
//         next();
//       }
//     } catch(error) {
//       res.status(401).json({
//         message : "Echec Authentification/middleware/auth",
//       })
//     //   ({error: new Error('Invalid request!')});
//     }
//   };


//     //     if(req._body === true){
//     //         //controle quand ça passe par Body RAW
//     //         console.log("---->req.body : TRUE");
//     //         if(req.body.userId === userIdDecodedToken){
//     //             next()
//     //         } else{
//     //             console.log("-----> Erreur Authentification Body Raw");
//     //             throw "erreur identification userId"
//     //         }

//     //     //controle quand ça passe par FORM_DATA(multer Image) params url
//     //     }else if(userIdParamsUrl === userIdDecodedToken){
//     //         next()
//     //     }else{
//     //         throw "erreur identification url params FORM_DATA"
//     //     }
//     // } catch {
//     //     res.status(401).json({
//     //         message : "Echec Authentification!!!!!!" });