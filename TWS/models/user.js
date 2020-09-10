'use strict';
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
    },
    cityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  User.associate = function (models) {
    const ops = {
      foreignKey: "userId",
      otherKey: "eventId",
      through: "Attendee"
    }
    User.belongsToMany(models.Event, ops);
    User.hasMany(models.Attendee, { foreignKey: 'userId' });
    User.belongsTo(models.City, { foreignKey: "cityId" })
    User.hasMany(models.Event, { foreignKey: "hostId" })
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  return User;
};
