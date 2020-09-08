'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Events', [
      {cityId: 1,
        date: new Date(),
        time: new Date(),
        venue: "House Of Blue",
        address: "1234 Down St.",
        name: "Crazy Shots",
        description: "Will be nuts",
        hostId: 1,
        numOfGuests: 4,
        limit: 25,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Events', null, {});
  }
};
