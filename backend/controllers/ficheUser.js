//Importation du models de la base de donnée MongoDB
const Sauce = require("../models/FicheUser");

//importation du module fs node.js pour accéder aux fichiers du server
const fs = require("fs");
const { log } = require("console");

exports.createSauce = (req, res, next) => {
  // console.logs("Contenu req.body --- controllers.ficheUser");
  // console.log(req.body);
  console.log("Contenu req.body.sauce --- controllers.ficheUser");
  console.log(req.body.sauce);
  //이미 JSON 형태인데 왜 ?
  // 그렇다면 sauce 를 가져올 때 String 형태로 받아야 하는게 정상
  const sauceObject = JSON.parse(req.body.sauce);

  console.log("Contenu sauceObject --- controllers.ficheUser");
  console.log(sauceObject);

  console.log(
    "------->Pour Fabriquer l'URL de l'image - controllers/ficheUser"
  );
  console.log(req.protocol);
  console.log(req.get("host"));
  console.log(req.file.filename);

  //instance Sauce
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  console.log("---------->Contenu sauce de new Sauce controllers/ficheUser");
  console.log(sauce);

  //enregistrer l'objet dans la base de donnée
  sauce
    .save()
    .then(() => {
      res.status(201).json({
        message: "objet enregistrée dans la base de donnée",
        contenu: req.body,
      });
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.gettAllSauces = (req, res, next) => {
  Sauce.find()
    .then((TousLesFichesUser) => res.status(200).json(TousLesFichesUser))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
  console.log("----> ROUTE ReadOneFicheUser");
  console.log(req.params.id);
  console.log({ _id: req.params.id });

  Sauce.findOne({ _id: req.params.id })
    .then((lobjet) => res.status(200).json(lobjet))
    .catch((error) => res.status(404).json({ error }));
};

/////////// A revoir modifySauce JS187
exports.modifySauce = (req, res, next) => {
  if (req.file) {
    // Recherche la sauce dans la base de données selon l'_id de la sauce
    Sauce.findOne({
      _id: req.params.id,
    })
      .then((sauce) => {
        // si l'image est modifiée, supprime l'ancienne image dans le dossier /images
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          // une fois l'ancienne image supprimée, mise à jour
          const sauceObject = {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`,
          };

          // sauvegarde la mise à jour
          Sauce.updateOne(
            { _id: req.params.id },
            { ...sauceObject, _id: req.params.id }
          )
            .then(() => res.status(200).json({ message: "Sauce modifiée!" }))
            .catch((error) => res.status(400).json({ error }));
        });
      })
      .catch((error) => res.status(500).json({ error }));
  } else {
    // si l'image n'est pas modifiée
    const sauceObject = { ...req.body };
    Sauce.updateOne(
      { _id: req.params.id },
      { ...sauceObject, _id: req.params.id }
    )
      .then(() => res.status(200).json({ message: "Sauce modifiée!" }))
      .catch((error) => res.status(400).json({ error }));
  }
};
// exports.modifySauce = (req, res, next) => {
//     console.log("----> ROUTE PUT updateOneFicheUser");
//     console.log(req.params.id);
//     console.log({ _id : req.params.id });

//     console.log("---->CONTENU PUT : req.body");
//     console.log(req.body);

//     console.log("---->CONTENU PUT : req.file");
//     console.log(req.file);

//     console.log("---->CONTENU PUT : _id : req.params.id");
//     console.log(req.params.id);

//     userIdParamsUrl = req.originalUrl.split("=")[1];
//     Sauce.findOne({_id : req.params.id})
//         .then((sauce) =>{
//             if(userIdParamsUrl === sauce.userId){
//             console.log("Authorisation pour suppression de la sauce");
//             console.log("---->CONTENU PUT : userIdParamsUrl");
//             console.log(userIdParamsUrl);

//     if(req.file){
//         Sauce
//             .findOne({_id : req.params.id})
//             .then((sauce) => {
//                 console.log("------>le retour de la promise sauce");
//                 console.log(sauce);

//                 //récupération du nom de la photo à supprimer dans la base de donnée
//                 const filename = sauce.imageUrl.split("/images")[1];
//                 console.log("--------->filename");
//                 console.log(filename);

//                 //suppression de l'image dans le dossier images du serveur
//                 fs.unlink(`images/${filename}`, (error) => {
//                     if(error)
//                     {
//                         throw "error, impossible de supprimer l'image dans le dossier images du server";
//                     }
//                 })
//             })
//             .catch((error) => res.status(400).json({error}))
//     }else{
//         console.log("False");
//     }

//     //l'objet qui va être mise à jour
//     console.log("--------> CONTENU : req.body");
//     console.log(req.body);
//     console.log("-------> CONTENU : req.body.sauce");
//     console.log(req.body.sauce);

//     //L'opérateur
//     //deux cas possible : req.file ? xxxxx : yyyyy
//     const sauceObject = req.file ?
//         //s'il y a un fichier, on éclate lo'bjet et récupère tout et converti en JSON + imageUrl
//         {
//             ...JSON.parse(req.body.sauce),
//             imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
//         } : // si la photo n'a pas été changée
//         { ...req.body}
//         console.log("------->CONTENU PUT sauceObject");
//         console.log(sauceObject);

//     //Mettre à jour la base de donnée
//     //modification qui sera envoyé dans la base de donnée
//     Sauce
//         .updateOne({ _id : req.params.id }, { ...sauceObject, _id : req.params.id })
//         .then(() => res.status(200).json({
//             message : "L'objet a été mis à jour",
//             contenu : req.body
//         }))
//         .catch((error) => res.status(400).json({error}));

//         } else{
//             console.log("userId différent de l'userId dans la sauce pas autorisé à modiffication");
//             throw "userId différent de l'userId dans la sauce pas autorisé à modiffication";
//         }
//     })
//         .catch((error) => res.status(403).json({error}));
// };

exports.deleteSauce = (req, res, next) => {
  // Recherche la sauce dans la base de données selon l'_id de la sauce
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      // Recherche le fichier de l'image

      console.log("----> sauce");
      console.log(sauce);

      console.log("-----> sauce userId");
      console.log(sauce.userId);

      console.log("----->Req.originalUrl");
      console.log(req.originalUrl);

      userIdParamsUrl = req.originalUrl.split("=")[1];
      console.log("------>Affichage de l'userid");
      console.log(userIdParamsUrl);

      //Controler si userId connecté est autorisé à supprimer l'objet
      // en comparant l'userId dans l'objet avec l'userId qui fait la demande
      if (userIdParamsUrl === sauce.userId) {
        console.log("Authorisation pour suppression de l'objet");
        const filename = sauce.imageUrl.split("/images/")[1];
        // utilisation de file system pour supprimer l'image dans le dossier /images
        fs.unlink(`images/${filename}`, () => {
          // Suppression de la Sauce dans la base de données
          Sauce.deleteOne({ _id: req.params.id })
            .then(() =>
              res
                .status(200)
                .json({ message: "La sauce a bien été suprimmée !" })
            )
            .catch((error) => res.status(400).json({ error }));
        });
      } else {
        throw "userId différent de l'userId objet à supprimer";
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

// ---------- LIKE, DISLIKE  ---------- //

// exports.opinionSauce = (req, res, next) => {

// }

exports.opinionSauce = (req, res, next) => {
  switch (req.body.like) {
    // Si l'utilisateur supprime son opinion
    case 0:
      // Recherche la sauce dans la base de données selon l'_id de la sauce
      Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
          // Si l'utilisateur avait liké la Sauce
          if (sauce.usersLiked.find((user) => user === req.body.userId)) {
            Sauce.updateOne(
              { _id: req.params.id },
              {
                // utilisations des variables $inc et $pull de mongodb pour mettre à jour
                // Décrémenter de 1 les likes
                $inc: { likes: -1 },

                // Retirer l'ID de l'utilisateur du tableau des liked
                $pull: { usersLiked: req.body.userId },
                _id: req.params.id,
              }
            )
              .then(() =>
                res
                  .status(201)
                  .json({ message: "Ton avis a été pris en compte!" })
              )
              .catch((error) => res.status(400).json({ error }));
          }

          // Si l'utilisateur avait disliké la Sauce
          if (sauce.usersDisliked.find((user) => user === req.body.userId)) {
            Sauce.updateOne(
              { _id: req.params.id },
              {
                // utilisations des variables $inc et $pull de mongodb pour mettre à jour
                // Décrémenter de 1 les dislikes
                $inc: { dislikes: -1 },

                // Retirer l'ID de l'utilisateur du tableau des disliked
                $pull: { usersDisliked: req.body.userId },
                _id: req.params.id,
              }
            )
              .then(() =>
                res
                  .status(201)
                  .json({ message: "Ton avis a été pris en compte!" })
              )
              .catch((error) => res.status(400).json({ error }));
          }
        })
        .catch((error) => res.status(404).json({ error }));
      break;

    // Si l'utilisateur like la Sauce
    case 1:
      // met à jour la sauce dans la base de données selon l'_id de la sauce
      Sauce.updateOne(
        { _id: req.params.id },
        {
          // utilisations des variables $inc et $push de mongodb pour mettre à jour
          // Incrémenter de 1 les likes
          $inc: { likes: 1 },

          // Ajouter l'ID de l'utilisateur au tableau des liked
          $push: { usersLiked: req.body.userId },
          _id: req.params.id,
        }
      )
        .then(() =>
          res.status(201).json({ message: "Ton like a été pris en compte !" })
        )
        .catch((error) => res.status(400).json({ error }));
      break;

    // Si l'utilisateur dislike la Sauce
    case -1:
      // met à jour la sauce dans la base de données selon l'_id de la sauce
      Sauce.updateOne(
        { _id: req.params.id },
        {
          // utilisations des variables $inc et $push de mongodb pour mettre à jour
          // Incrémenter de 1 les disliked
          $inc: { dislikes: 1 },

          // Ajouter l'ID de l'utilisateur au tableau des disliked
          $push: { usersDisliked: req.body.userId },
          _id: req.params.id,
        }
      )
        .then(() =>
          res
            .status(201)
            .json({ message: "Ton dislike a été pris en compte !" })
        )
        .catch((error) => res.status(400).json({ error }));
      break;

    // Si la valeur attendu n'est pas correcte
    default:
      console.error("Cette valeur n'est pas valide !");
  }
};
