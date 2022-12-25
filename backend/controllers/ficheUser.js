//Importation du models de la base de donnée MongoDB
const FicheUser = require('../models/FicheUser');

exports.createFicheUser = (req, res, next) => {
    console.log("Contenu req.body --- controllers.ficheUser");
    console.log(req.body);

    //Pas besoin d'utiliser un JSON.parse(); pour req.body.ficheUser
    const userFicheObject = req.body;
    console.log("Contenu userFicheObject --- controllers.ficheUser");
    console.log(userFicheObject);

        //l'instance FicheUser
    const ficheUser = new FicheUser( {
        ...userFicheObject
    });
    console.log("---------->Contenu ficheUser de new FicheUser controllers/ficheUser");
    console.log(ficheUser);

    //enregistrer l'objet dans la database
    ficheUser
        .save()
            .then(() => {
                res.status(201).json({
                    message: "objet enregistré dans la base de donnée",
                    contenu : req.body
                })
            })
                .catch((error) => res.status(400).json({error}))
}

exports.readAllFicheUser = (req, res, next) => {
    FicheUser
        .find()
        .then((TousLesFichesUser) => res.status(200).json(TousLesFichesUser))
        .catch((error) => res.status(400).json({error}))
}

// Pour afficher un objet grâce à son id
exports.readOneFicheUser = (req, res, next) => {
    console.log("----> ROUTE ReadOneFicheUser");
    console.log(req.params.id);
    console.log({ _id : req.params.id });

    FicheUser
        .findOne({ _id : req.params.id })
        .then((lobjet) => res.status(200).json(lobjet))
        .catch((error) => res.status(404).json({error}))
}

/////////////////
//userID 와 _id 의 구분을 명확히 해야함 예를 들어 새로운 유저를 만들 때 _id 는 없는 상태로 만들어야함
/////////////////

// Pour modifier un objet qui a été sélectionné par son id
exports.updateOneFicheUser = (req, res, next) => {
    console.log("----> ROUTE updateOneFicheUser");
    console.log(req.params.id);
    console.log({ _id : req.params.id });

    // //modification qui sera envoyé dans la base de donnée
    FicheUser
        .updateOne({ _id : req.params.id }, { ...req.body, _id : req.params.id })
        .then(() => res.status(200).json({
            message : "L'objet a été mis à jour",
            contenu : req.body
        }))
        .catch(error => res.status(400).json({error}))
}

// Suppression d'un objet sélectionné
exports.deleteOneFicheUser = (req, res, next) => {
    console.log("----> deleteOneFicheUser");
    console.log({ _id : req.params.id });

    FicheUser
        .deleteOne({ _id : req.params.id })
        .then(() => res.status(200).json({message : "L'objet a été supprimé"}))
        .catch(error => res.status(400).json({error}))
        
}