'use strict';
module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define('City', {
    name: DataTypes.STRING,
  }, {});
  City.associate = function(models) {
   City.hasMany(models.Event, { foreignKey: "cityId" });
   City.hasMany(models.User, { foreignKey: "cityId" })
  };
  return City;
};