'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: "Bart",
        lastName: "Simpson",
        email: "skoolsuks@aol.com",
        hashedPassword: "1234",
        cityId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: "Spongebob",
        lastName: "Squarepants",
        email: "jellyfishfields@yahoo.com",
        hashedPassword: "1234",
        cityId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: "TheMostInterestingMan",
        lastName: "InTheWorld",
        email: "dosEquis4life@gmail.com",
        hashedPassword: "1234",
        cityId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: "George",
        lastName: "Clooney",
        email: "IMakeTerribleTequila@idc.com",
        hashedPassword: "1234",
        cityId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: "Bertram",
        lastName: "Gilfoyle",
        email: "DineshSmells@PiedPiper.com",
        hashedPassword: "1234",
        cityId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: "Winnie",
        lastName: "The_Pooh",
        email: "HoneyYumm@gmail.com",
        hashedPassword: "1234",
        cityId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: "James",
        lastName: "Bond",
        email: "NotA.spy@spycorp.com",
        hashedPassword: "1234",
        cityId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: "Snoop",
        lastName: "Dogg",
        email: "gfunksmashers@lbc.com",
        hashedPassword: "1234",
        cityId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});

  }
};
