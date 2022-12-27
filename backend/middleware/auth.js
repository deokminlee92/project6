///////////////////// JS 167 토큰 테스트  확

// Importation
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv').config();

// exportation de la fonction du middleware
module.exports = (req, res, next) => {
    try {
    // console.log(req.headers.authorization);

    //Récupérer le token envoyé par frontend
    //[1], pour rattrapper l'index 1 non bearer 
    const token = req.headers.authorization.split(' ')[1];

    //décoder le token
    const decodedToken = jwt.verify(token, `${process.env.JWT_KEY_TOKEN}`);

    console.log("------>decodedToken");
    console.log(decodedToken);

    console.log("---> CONTENU du req.body");
    console.log(req);
    // Récupérer le userId qu'il y a à l'intérieur du token déchiffré et le comparer avec l'userId
    //userId dechiffré
    const userIdDecodedToken = decodedToken.userId;
    console.log("---> CONTENU : userId du decoded TOKEN");
    console.log(userIdDecodedToken);


    console.log("---> userId dans le body de la request");
    console.log(req.body.userId);
    
    console.log("------>Req.originalUrl");
    console.log(req.originalUrl);

    userIdParamsUrl = req.originalUrl.split("=")[1];
    console.log("------> affichage de l'id");
    console.log(userIdParamsUrl);

    //Comparaison du userId qu'il y a dans la req avec le userId qu'il y a dans le token
        if(req._body === true){
            //controle quand ça passe par Body RAW
            console.log("---->req.body : TRUE");
            if(req.body.userId === userIdDecodedToken){
                next()
            } else{
                console.log("-----> Erreur Authentification Body Raw");
                throw "erreur identification userId"
            }

        //controle quand ça passe par FORM_DATA(multer Image) params url
        }else if(userIdParamsUrl === userIdDecodedToken){
            next()
        }else{
            throw "erreur identification url params FORM_DATA"
        }
    // Si j'ai un userId et si l'userId est différent d'userId Token,
    // if (req.body.userId && (req.body.userId !== userIdDecodedToken)) {
    //     throw "User Id non validé"
    //         } else {
    //             next(); 
    //         }
    } catch {
        res.status(401).json({
            message : "Echec Authentification" });
  }
};