const model = require("../models");
const shortid = require("shortid");

module.exports = {
  addnewcours: function (req, res) {
    const { user } = req;
    let itm = new model.abonnement({
      idabon: shortid.generate(),
      prix: req.body.prix,
      idUsers: user.id,
      idcours: req.body.idcours,
    });
    model.abonnement
      .create({
        idabon: itm.idabon,
        prix: itm.prix,
        idUsers: itm.idUsers,
        idcours: itm.idcours,
      })
      .then((newabonne) => {
        if (newabonne) res.json({ newabonne });
      })
      .catch((err) => {
        console.log(err), res.status(err).json({ err });
      });
  },
};
