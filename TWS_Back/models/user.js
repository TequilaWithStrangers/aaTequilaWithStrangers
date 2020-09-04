'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    cityId: DataTypes.INTEGER
  }, {});
  User.associate = function(models) {
    const ops = {
      foreignKey: "userId",
      otherKey: "eventId",
      through: "Attendee"
    }
    User.belongsToMany(models.Event, ops)
    User.belongsTo(models.City, { foreignKey: "cityId" })
    User.belongsTo(models.Event, { foreignKey: "hostId" })
    

  };
  return User;
};