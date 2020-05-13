const model = require("../models");
const shortid = require("shortid");

function chekErrer(req) {
  let mssg = null;
  if (req.body.username == null || req.body.passwords == null)
    mssg = "completer tous le champs";
  else if (req.body.username < 4) mssg = "le nom est trops courte ";
  else if (!req.body.username || !req.passwords == null)
    mssg = "completer tous le champs";
  return mssg;
}
module.exports = {
  //=============================================Enregistrement
  newuser: function (req, res) {
    const passwords = req.body.passwords;

    let itm = new model.utilisateur({
      id: shortid.generate(),
      username: req.body.username,
      niveauacc: req.body.niveauacc,
    });

    itm.setPassword(passwords);

    model.utilisateur
      .findOne({
        where: { username: itm.username },
      })
      .then((user) => {
        if (user) res.json({ error: "user exist" });
        else
          model.utilisateur
            .create({
              id: itm.id,
              username: itm.username,
              passwords: itm.passwords,
              niveauacc: itm.niveauacc,
            })
            .then((newUser) => {
              res.json({ newUser });
            })
            .catch((error) => {
              console.log(error);
              res.status(400).json({ error });
            });
      })
      .catch((errors) => {
        console.log(errors);
        res.status(400).json({ errors });
      });
  },

  //===============================================================Select *

  notify: function (req, res) {
    model.utilisateur
      .findAll()
      .then((user) => {
        if (user) res.json({ user });
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({ error });
      });
  },

  //=================================================================select with name

  notify2: function (req, res) {
    let item = new model.utilisateur({
      username: req.body.username,
    });
    model.utilisateur
      .findOne({
        where: { username: item.username },
      })
      .then((user) => {
        if (user) res.json({ user });
        else return res.status(400).json({ error: "nothing some one" });
      })
      .catch((error) => {
        console.log(error);
        res.status(4003).json({ error });
      });
  },

  //===============================================================================logine
  login: function (req, res) {
    if (chekErrer(req)) {
      return res.status(403).json({ error: chekErrer(req) });
    }
    console.log("je suis la 2");
    const { username, passwords } = req.body;

    model.utilisateur
      .findOne({
        where: {
          username: username,
        },
      })
      .then((user) => {
        if (!user) res.status(403).json({ error: "nothing user" });

        if (user.comparePassword(passwords))
          res.status(200).json({ user: user.toAuthJSON() });
      })
      .catch((error) => {
        console.log(error);
        res.status(403).json({ error: "error token" });
      });
  },
  //=========================================================update
  update: function (req, res) {
    //const passwords = req.body.passwords;
    let itm = new model.utilisateur({
      username: req.body.username,
      niveauacc: req.body.niveauacc,
    });
    model.utilisateur
      .update(
        { niveauacc: itm.niveauacc },
        { where: { username: itm.username } }
      )
      .then((user) => {
        if (user) res.json({ user });
        else res.status(400).json({ error: "something" });
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({ error });
      });
  },
};
