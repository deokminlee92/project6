// Importation 
// Express permet de faire la jonction app.js et le dossier routes
const express = require('express');
//Fonction Router()
const router = express.Router();

//Importation du middleware password
const userPasswordCtrl = require('../middleware/controle_password')

// Importation du controllers/user.js
const userCtrl = require('../controllers/user');

// deux routes POST
router.post("/signup",userPasswordCtrl,userCtrl.signup);
router.post('/login', userCtrl.login);

//Exportation du module
module.exports = router;