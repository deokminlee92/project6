//Importation du models de la base de donnée MongoDB
const Sauce = require('../models/FicheUser');

exports.createSauce = (req, res, next) => {
    console.log("Contenu req.body --- controllers.ficheUser");
    console.log(req.body);
    console.log("Contenu req.body.sauce --- controllers.ficheUser");
    console.log(req.body.sauce);
    
    ////////////수정판 JSON.parse() 를 사용할 필요 없음 pour req.body.sauce
    const sauceObject = JSON.parse(req.body.sauce);

    console.log("Contenu sauceObject --- controllers.ficheUser");
    console.log(sauceObject);

    console.log("------->Pour Fabriquer l'URL de l'image - controllers/ficheUser");
    console.log(req.protocol);
    console.log(req.get("host"));
    console.log(req.file.filename);

    //instance Sauce
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    });
    console.log("---------->Contenu sauce de new Sauce controllers/ficheUser");
    console.log(sauce);

    //enregistrer l'objet dans la base de donnée
    sauce
    .save()
    .then(() => {
        res.status(201).json({
            message : "objet enregistrée dans la base de donnée",
            contenu : req.body
        })
    })
    .catch((error) => res.status(400).json({error}))


    ///////////수정판

    // const sauceObject = JSON.parse(req.body.sauce);
    // console.log("Contenu sauceObject --- controllers.sauceCtrl");
    // console.log(sauceObject);

    // console.log("-----> Pour fabriquer l'URL de l'image ");
    // console.log(req.protocol);
    // console.log(req.get("host"));
    // console.log(req.file.filename);

    //     //l'instance sauceCtrl
    // const sauce = new Sauce( {
    //     ...sauceObject,
    //     imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    // });
    // console.log("---------->Contenu sauce de new Sauce controllers/ficheUser");
    // console.log(sauce);

    // //enregistrer l'objet dans la database
    // sauce
    //     .save()
    //         .then(() => {
    //             res.status(201).json({
    //                 message: "objet enregistré dans la base de donnée",
    //                 contenu : req.body
    //             })
    //         })
    //             .catch((error) => res.status(400).json({error}))
};

exports.gettAllSauces = (req, res, next) => {
    Sauce
        .find()
        .then((TousLesFichesUser) => res.status(200).json(TousLesFichesUser))
        .catch((error) => res.status(400).json({error}))
}

// Pour afficher un objet grâce à son id
exports.getOneSauce = (req, res, next) => {
    console.log("----> ROUTE ReadOneFicheUser");
    console.log(req.params.id);
    console.log({ _id : req.params.id });

    Sauce
        .findOne({ _id : req.params.id })
        .then((lobjet) => res.status(200).json(lobjet))
        .catch((error) => res.status(404).json({error}))
}

/////////////////
//userID 와 _id 의 구분을 명확히 해야함 예를 들어 새로운 유저를 만들 때 _id 는 없는 상태로 만들어야함
/////////////////

// Pour modifier un objet qui a été sélectionné par son id
exports.modifySauce = (req, res, next) => {
    console.log("----> ROUTE updateOneFicheUser");
    console.log(req.params.id);
    console.log({ _id : req.params.id });

    // //modification qui sera envoyé dans la base de donnée
    // Sauce
    //     .updateOne({ _id : req.params.id }, { ...req.body, _id : req.params.id })
    //     .then(() => res.status(200).json({
    //         message : "L'objet a été mis à jour",
    //         contenu : req.body
    //     }))
    //     .catch(error => res.status(400).json({error}))
}

// Suppression d'un objet sélectionné
exports.deleteSauce = (req, res, next) => {
    console.log("----> deleteOneFicheUser");
    console.log({ _id : req.params.id });

    Sauce
        .deleteOne({ _id : req.params.id })
        .then(() => res.status(200).json({message : "L'objet a été supprimé"}))
        .catch(error => res.status(400).json({error}))
        
}