'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    hashedPassword: DataTypes.STRING,
    cityId: DataTypes.INTEGER
  }, {});
  User.associate = function (models) {
    const ops = {
      foreignKey: "userId",
      otherKey: "eventId",
      through: "Attendee"
    }
    User.belongsToMany(models.Event, ops);
    User.hasMany(models.Attendee, {foreignKey:'userId'});
    User.belongsTo(models.City, { foreignKey: "cityId" })
    User.hasMany(models.Event, { foreignKey: "hostId" })


  };
  return User;
};
