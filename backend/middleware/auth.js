// Importation
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    //Récupérer le token envoyé par frontend
    //[1], pour rattrapper l'index 1 non bearer
    const token = req.headers.authorization.split(" ")[1];

    //décoder le token
    const decodedToken = jwt.verify(token, process.env.JWT_KEY_TOKEN);

    //Comparaison du userId qu'il y a dans la req avec le userId qu'il y a dans le token
    const userId = decodedToken.userId;
    req.auth = { userId: userId };

    //Si l'userId envoyé par le front est différent de celui de la base de donnée
    if (req.body.userId && req.body.userId !== userId) {
      throw "Echec Authentification";
    } else {
      next();
    }
  } catch {
    res.status(401).json({ error: new Error("Requête Invalidée") });
  }
};
