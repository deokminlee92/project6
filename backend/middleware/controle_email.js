// Importation package Validator pour vérifier si l'utilisateur saisi un format d'adresse email
const validator = require("validator");

module.exports = function (req, res, next) {
  const email = req.body.email;

  if (validator.isEmail(req.body.email)) {
    next();
  } else {
    return res.status(400).json({ error: `${email} n'est pas validé` });
  }
};
