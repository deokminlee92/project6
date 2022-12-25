///////////////////// JS 167 토큰 테스트  확

// Importation
const jwt = require("jsonwebtoken");
require('dotenv').config();

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
    
    // Récupérer le userId qu'il y a à l'intérieur du token déchiffré et le comparer avec l'userId
    
    //userId dechiffré
    const userIdDecodedToken = decodedToken.userId;
    req.auth = { 
        userId: userIdDecodedToken 
    };

    //Comparaison du userId qu'il y a dans la req avec le userId qu'il y a dans le token
    // Si j'ai un userId et si l'userId est différent d'userId Token,
    if (req.body.userId && (req.body.userId !== userIdDecodedToken)) {
        throw "User Id non validé"
            } else {
                next(); 
            }
    } catch {
        res.status(401).json({
            message : "Echec Authentification" });
  }
};