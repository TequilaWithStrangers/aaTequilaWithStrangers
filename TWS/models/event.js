'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    cityId: DataTypes.INTEGER,
    date: DataTypes.DATE,
    time: DataTypes.TIME,
    venue: DataTypes.STRING,
    address: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    hostId: DataTypes.INTEGER,
    numOfGuests: DataTypes.INTEGER,
    limit: DataTypes.INTEGER
  }, {});
  Event.associate = function(models) {
    const ops = {
      foreignKey: "eventId",
      otherKey: "userId",
      through: "Attendee"
    }
    Event.belongsToMany(models.User, ops)
    Event.hasMany(models.Attendee, {foreignKey:"eventId"});
    Event.belongsTo(models.City, { foreignKey: "cityId" });
    Event.belongsTo(models.User, { foreignKey: "hostId" });
  };
  return Event;
};
