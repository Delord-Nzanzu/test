const model = require("../models");
const shortid = require("shortid");
const { Op } = require("sequelize");

function chekerr(req) {
  let message = null;
  if (req.body.titre == null || req.body.dates == null)
    message = "veuillez complet tous le champs";
}

module.exports = {
  add: function (req, res) {
    let itm = new model.cours({
      idcours: shortid.generate(),
      titre: req.body.titre,
      dates: req.body.dates,
      prix: req.body.prix,
    });
    const { user } = req;
    // console.log("User:" + user.id),
    if (user.niveauacc == 5)
      model.cours
        .findOne({
          where: { titre: itm.titre },
        })
        .then((title) => {
          if (title) res.json({ error: "titre of cours exist" });
          else
            model.cours
              .create({
                idcours: itm.idcours,
                titre: itm.titre,
                dates: itm.dates,
                prix: itm.prix,
              })
              .then((newtitre) => {
                if (newtitre) res.json({ newtitre });
              })
              .catch((error) => {
                console.log(err), res.status(403).json({ error });
              });
        });
    else res.json({ error: "Acces refuse" });
  },
  //==========================================================select
  affichage: function (req, res) {
    model.cours
      .findAll()
      .then((ress) => {
        if (ress) res.json({ ress });
        else res.status(400).json({ error: "nothing" });
      })
      .catch((err) => {
        console.log(err);
        res.status(404).json({ err });
      });
  },
  //============================================================update
  update: function (req, res) {
    let itm = new model.cours({
      idcours: req.body.idcours,
      titre: req.body.titre,
      prix: req.body.prix,
    });
    model.cours
      .findOne({ where: { idcours: itm.idcours } })
      .then((idcours) => {
        if (!idcours)
          res
            .status(403)
            .json({ error: "les donnees modifiable n'existe pas" });
        else
          model.cours
            .update(
              { titre: itm.titre, prix: itm.prix },
              { where: { idcours: itm.idcours } }
            )
            .then((title) => {
              if (title) res.json(title);
            })
            .catch((errs) => {
              console.log(errs), res.status(404).json({ errs });
            });
      })
      .catch((err) => {
        console.log(err), res.status(400).json({ err });
      });
  },

  serch: function (req, res) {
    // let itm = new model.cours({
    //   titre: req.body.titre,
    // });
    let { titre, limit, offset } = req.query;
    limit = parseInt(limit, 10);
    offset = parseInt(offset, 10);
    model.cours
      .findAll({
        limit,
        offset,
        where: {
          [Op.or]: {
            titre: {
              [Op.like]: `%${titre}%`,
            },
          },
        },
      })
      .then((titre) => {
        if (titre) res.json(titre);
      })
      .catch((error) => {
        console.log(error);
        res.status(404).json({ error });
      });
  },
};
