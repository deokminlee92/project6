const express = require('express');
// const auth = require('../middleware/auth');

//importation du controllers/user.js
const ficheUser = require('../controllers/ficheUser');
const { route } = require('./user');

//fonction Router()
const router = express.Router();

//importation du middleware d'auth
const auth = require('../middleware/auth');

//Les routes
// Suite de la route dans app.js + fonction qu'il y a dans controllers/ficheUser
router.post("/", auth, ficheUser.createFicheUser);

// afficher toutes les données du routes/ficheUser
router.get("/", auth,ficheUser.readAllFicheUser);

//_id:ObjectIf("")  // la route get pour afficher un objet grâce à son id
router.get("/:id", auth,ficheUser.readOneFicheUser);

router.put("/:id", auth,ficheUser.updateOneFicheUser);

router.delete("/:id", auth, ficheUser.deleteOneFicheUser )


module.exports = router;

