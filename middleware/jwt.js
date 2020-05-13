const jwt = require("jsonwebtoken");

module.exports = {
  verifyToken: function (req, res, next) {
    if (!req.headers.authorization)
      return res.status(403).json({ error: "unauthorized user" });

    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, "secretkey", (err, decoded) => {
      if (err) {
        console.log(err);
        return res.status(403).json({ error: "unauthorized user" });
      } else {
        req.user = decoded;
        next();
      }
    });
  },
};
