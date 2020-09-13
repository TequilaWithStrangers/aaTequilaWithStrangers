'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Cities', [
      {name: 'San Diego', createdAt: new Date(), updatedAt: new Date()},
      {name: 'New York', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Chicago', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Philadelphia', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Warsaw', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Detroit', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Boston', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Córdoba', createdAt: new Date(), updatedAt: new Date()},
    ], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Cities', null, {});

  }
};
