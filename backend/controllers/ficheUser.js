//Importation du models de la base de donnée MongoDB
const Sauce = require('../models/FicheUser');

//importation du module fs node.js pour accéder aux fichiers du server
const fs = require('fs');
const { log } = require('console');

exports.createSauce = (req, res, next) => {
    // console.log("Contenu req.body --- controllers.ficheUser");
    // console.log(req.body);
    console.log("Contenu req.body.sauce --- controllers.ficheUser");
    console.log(req.body.sauce);
    //이미 JSON 형태인데 왜 ? 
    // 그렇다면 sauce 를 가져올 때 String 형태로 받아야 하는게 정상
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
};

exports.gettAllSauces = (req, res, next) => {
    Sauce
        .find()
        .then((TousLesFichesUser) => res.status(200).json(TousLesFichesUser))
        .catch((error) => res.status(400).json({error}))
}


exports.getOneSauce = (req, res, next) => {
    console.log("----> ROUTE ReadOneFicheUser");
    console.log(req.params.id);
    console.log({ _id : req.params.id });

    Sauce
        .findOne({ _id : req.params.id })
        .then((lobjet) => res.status(200).json(lobjet))
        .catch((error) => res.status(404).json({error}))
}

/////////// A revoir modifySauce
exports.modifySauce = (req, res, next) => {
    console.log("----> ROUTE PUT updateOneFicheUser");
    console.log(req.params.id);
    console.log({ _id : req.params.id });

    console.log("---->CONTENU PUT : req.body");
    console.log(req.body);

    console.log("---->CONTENU PUT : req.file");
    console.log(req.file);

    if(req.file){
        Sauce
            .findOne({_id : req.params.id})
            .then((objet) =>{
                console.log("------>le retour de la promise objet");
                console.log(objet);

                //récupération du nom de la photo à supprimer dans la base de donnée
                const filename = objet.imageUrl.split("/images")[1];
                console.log("--------->filename");
                console.log(filename);

                //suppression de l'image dans le dossier images du serveur
                // fs.unlink(`/images/${filename}`, (error) => {
                //     if(error) throw error;
                // })
            })
            .catch((error) => res.status(400).json({error}))
    }else{
        console.log("False");
    }

    //l'objet qui va être mise à jour
    console.log("--------> CONTENU : req.body");
    console.log(req.body);
    console.log("-------> CONTENU : req.body.sauce");
    console.log(req.body.sauce);

    //L'opérateur 
    //deux cas possible : req.file ? xxxxx : yyyyy
    const sauceObject = req.file ?
        //s'il y a un fichier, on éclate lo'bjet et récupère tout et converti en JSON + imageUrl
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        } : // si la photo n'a pas été changée
        { ...req.body}
        console.log("------->CONTENU PUT sauceObject");
        console.log(sauceObject);

    //Mettre à jour la base de donnée
    //modification qui sera envoyé dans la base de donnée
    Sauce
        .updateOne({ _id : req.params.id }, { ...sauceObject, _id : req.params.id })
        .then(() => res.status(200).json({
            message : "L'objet a été mis à jour",
            contenu : req.body
        }))
        .catch(error => res.status(400).json({error}))
}


exports.deleteSauce = (req, res, next) => {

    // Recherche la sauce dans la base de données selon l'_id de la sauce 
        Sauce.findOne({ _id: req.params.id })
            .then(sauce => {

             // Recherche le fichier de l'image
            const filename = sauce.imageUrl.split('/images/')[1];

             // utilisation de file system pour supprimer l'image dans le dossier /images
            fs.unlink(`images/${filename}`, () => {

                 // Suppression de la Sauce dans la base de données
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'La sauce a bien été suprimmée !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
}
