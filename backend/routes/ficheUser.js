const express = require('express');

//importation du controllers/user.js
const sauceCtrl = require('../controllers/ficheUser');
// const { route } = require('./user');

//fonction Router()
const router = express.Router();

//importation du middleware d'auth
const auth = require('../middleware/auth');

const multer = require("../middleware/multer");

//Les routes
router.post("/", auth, multer, sauceCtrl.createSauce);

router.get("/", auth,sauceCtrl.gettAllSauces);

router.get("/:id", auth,sauceCtrl.getOneSauce);

router.put("/:id", auth, multer, sauceCtrl.modifySauce);

router.delete("/:id", auth, sauceCtrl.deleteSauce );

router.post("/:id/like" , auth, sauceCtrl.opinionSauce)

module.exports = router;

