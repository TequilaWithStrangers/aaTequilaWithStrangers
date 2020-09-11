'use strict';
module.exports = (sequelize, DataTypes) => {
  const Attendee = sequelize.define('Attendee', {
    userId: DataTypes.INTEGER,
    eventId: DataTypes.INTEGER
  }, {});
  Attendee.associate = function(models) {
    // associations can be defined here
    Attendee.belongsTo(models.User, {foriegnKey:'userId'});
    Attendee.belongsTo(models.Event, {as: 'event', foriegnKey:'eventId'});
  };
  return Attendee;
};
