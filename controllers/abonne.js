const models = require("../models");
const shortid = require("shortid");

module.exports = {
  add: function (req, res) {
    const { user } = req;
    let item = new models.abonnement({
      idabon: shortid.generate(),
      prix: req.body.prix,
      idUsers: user.id,
      idcours: req.body.idcours,
    });
    models.cours
      .findOne({
        where: { idcours: item.idcours },
      })
      .then((course) => {
        // console.log(item.idUsers);
        if (course.prix != item.prix)
          res.status(403).json({
            error: "price error",
          });
        else if (course.idcours == item.idcours && item.idUsers)
          res.status(403).json({ error: "Tu es deja abonner a se cour" });
        else
          item
            .save()
            .then((newabonne) => {
              if (newabonne) res.json({ newabonne });
            })
            .catch((err) => {
              console.log(err);
              res.status(err).json({ err });
            });
      })
      .catch((err) => {
        console.log(err);
        res.status(200).json({ err });
      });
  },
  subscriptions: function (req, res) {
    const { user } = req;
    models.abonnement
      .findAll({
        where: { idUsers: user.id },
      })
      .then((subscriptions) => {
        if (subscriptions) res.json({ subscriptions });
      })
      .catch((err) => {
        console.log(err);
        res.status(403).json({ err });
      });
  },
};
