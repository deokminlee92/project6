//Importation du models de la base de donnée MongoDB
const Sauce = require("../models/FicheUser");

//importation du module fs node.js pour accéder aux fichiers du server
const fs = require("fs");
const { log } = require("console");


// --------- Creation Sauce ----------- // 
exports.createSauce = (req, res) => {
  const sauceObject = JSON.parse(req.body.sauce);
  //instance Sauce
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
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

// --------- Afficher Toutes les Sauces présentes dans la base de données ----------- // 
exports.gettAllSauces = (req, res) => {
  Sauce.find()
    .then((TousLesFichesUser) => res.status(200).json(TousLesFichesUser))
    .catch((error) => res.status(400).json({ error }));
};

// --------- Afficher une sauce séléctionnée ----------- // 
exports.getOneSauce = (req, res) => {
  Sauce.findOne({ _id: req.params.id })
    .then((lobjet) => res.status(200).json(lobjet))
    .catch((error) => res.status(404).json({ error }));
};

// --------- Suppression d'une Sauce ----------- // 
exports.modifySauce = (req, res) => {
  if (req.file) {
    // Recherche la sauce dans la base de données selon l'_id de la sauce
    Sauce.findOne({
      _id: req.params.id,
    })
      .then((sauce) => {
        // si l'image est modifiée, supprimer l'ancienne image dans le dossier images
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          // une fois l'ancienne image supprimée, mise à jour
          const sauceObject = {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`,
          };
        //Mettre à jour la base de donnée
          Sauce.updateOne(
            { _id: req.params.id },
            { ...sauceObject, _id: req.params.id }
          )
            .then(() => res.status(200).json({ message: "Le produit a été mis à jour" }))
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
      .then(() => res.status(200).json({ message: "Le produit a été mis à jour" }))
      .catch((error) => res.status(400).json({ error }));
  }
};

// ------------------ Delete Produit --------------------- //
exports.deleteSauce = (req, res) => {

    // Recherche la sauce dans la base de données selon l'_id de la sauce 
     Sauce.findOne({ _id: req.params.id })
         .then(sauce => {

             // Recherche le fichier de l'image
             const filename = sauce.imageUrl.split('/images/')[1];

             // utilisation de file system pour supprimer l'image dans le dossier /images
             fs.unlink(`images/${filename}`, () => {

                 // Suppression de la Sauce dans la base de données
                 Sauce.deleteOne({ _id: req.params.id })
                     .then(() => res.status(200).json({ message: 'Le produit a bien été suprimmée' }))
                     .catch(error => res.status(400).json({ error }));
             });
         })
         .catch(error => res.status(500).json({ error }));
}

// ---------- LIKE, DISLIKE  ---------- //
exports.opinionSauce = (req, res) => {
// Switch?
  switch (req.body.like) {
    // Si l'utilisateur supprime son avis
    case 0:
      // Recherche la sauce dans la base de données avec l'_id de la sauce
      Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
          // Si l'utilisateur avait appuyé "like" 
          if (sauce.usersLiked.find((user) => user === req.body.userId)) {
            Sauce.updateOne(
              { _id: req.params.id },
              {
                // utilisations des variables $inc et $pull de mongodb pour mettre à jour
                // Décrémenter de 1 les likes
                $inc: { likes: -1 },
                // Supprimer l'Id de l'utilisateur entré dans le tableau du liked
                $pull: { usersLiked: req.body.userId },
                _id: req.params.id,
              }
            )
              .then(() =>
                res
                  .status(201)
                  .json({ message: "Votre avis a été pris en compte" })
              )
              .catch((error) => res.status(400).json({ error }));
          }

          // Si l'utilisateur avait appuyé dislike
          if (sauce.usersDisliked.find((user) => user === req.body.userId)) {
            Sauce.updateOne(
              { _id: req.params.id },
              {
                // utilisations des variables $inc et $pull de mongodb pour mettre à jour
                // Décrémenter de 1 les dislikes
                $inc: { dislikes: -1 },

                // Supprimer l'Id de l'utilisateur entré dans le tableau du disliked
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
      // mettre à jour dans la base de données selon l'_id de la sauce
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
          res.status(201).json({ message: "Votre avis like a été pris en compte" })
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
            .json({ message: "Votre avis dislike a été pris en compte" })
        )
        .catch((error) => res.status(400).json({ error }));
      break;

    // Si la valeur attendu n'est pas correcte
    default:
      console.error("Cette valeur n'est pas valide !");
  }
};
