const express = require('express');
// const auth = require('../middleware/auth');

//importation du controllers/user.js
const sauceCtrl = require('../controllers/ficheUser');
// const { route } = require('./user');

//fonction Router()
const router = express.Router();

//importation du middleware d'auth
const auth = require('../middleware/auth');


const multer = require("../middleware/multer");
//Les routes
// Suite de la route dans app.js + fonction qu'il y a dans controllers/ficheUser
router.post("/", auth, multer, sauceCtrl.createSauce);

// afficher toutes les données du routes/ficheUser
router.get("/", auth,sauceCtrl.gettAllSauces);

//_id:ObjectIf("")  // la route get pour afficher un objet grâce à son id
router.get("/:id", auth,sauceCtrl.getOneSauce);

router.put("/:id", auth, multer, sauceCtrl.modifySauce);

router.delete("/:id", auth, sauceCtrl.deleteSauce );

//Like router
router.post("/:id/like" , auth, sauceCtrl.opinionSauce)


module.exports = router;

