/* jshint indent: 2 */
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = function (sequelize, DataTypes) {
  const TUser = sequelize.define(
    "utilisateur",
    {
      id: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      passwords: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      niveauacc: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
    },
    {
      tableName: "utilisateur",
      timestamps: false,
      defaultScope: {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    }
  );
  TUser.prototype.generateJWT = function generateJWT() {
    return jwt.sign(
      {
        id: this.id,
        niveauacc: this.niveauacc,
      },
      "secretkey"
    );
  };
  TUser.prototype.toAuthJSON = function toAuthJSON() {
    return {
      id: this.id,
      token: this.generateJWT(),
    };
  };
  TUser.prototype.setPassword = function setPassword(password) {
    this.passwords = bcrypt.hashSync(password, 12);
  };
  TUser.prototype.comparePassword = function comparePassword(password) {
    return bcrypt.compareSync(password, this.passwords);
  };
  return TUser;
};
