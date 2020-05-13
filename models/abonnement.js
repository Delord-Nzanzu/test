/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "abonnement",
    {
      idabon: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
      },
      prix: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      idUsers: {
        type: DataTypes.STRING(50),
        allowNull: true,
        references: {
          model: "utilisateur",
          key: "id",
        },
      },
      idcours: {
        type: DataTypes.STRING(50),
        allowNull: true,
        references: {
          model: "cours",
          key: "idcours",
        },
      },
    },
    {
      tableName: "abonnement",
      timestamps: false,
      defaultScope: {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    }
  );
};
