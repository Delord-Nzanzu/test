/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "cours",
    {
      idcours: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
      },
      titre: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      dates: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
    },
    {
      tableName: "cours",
      timestamps: false,
      defaultScope: {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    }
  );
};
