'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Events', [
      {cityId: 1,
        date: new Date(),
        time: new Date(),
        venue: "House Of Blues",
        address: "1234 Down St.",
        name: "Crazy Shots",
        description: "Will be nuts.",
        hostId: 1,
        numOfGuests: 4,
        limit: 25,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {cityId: 1,
        date: new Date(),
        time: new Date(),
        venue: "Mothers Pub",
        address: "306 Bacon Ave",
        name: "Salty Bois",
        description: "Come hangout and meet the locals in Ocean Beach and take some peanut butter tequila shots with us and maybe play some pool and throw some darts. We will go grab a bag of bacon for a late night snack",
        hostId: 3,
        numOfGuests: 6,
        limit: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {cityId: 4,
        date: new Date(),
        time: new Date(),
        venue: "Chuck-E-Cheese",
        address: "800 E Broadway",
        name: "Time-out Parents",
        description: "Come take a break from the kids and hang out at chuck e cheese and play some arcade games with us.  We will have complimentary pizza and bbq wings all night long, or at least until 7pm, when we shut down the joint",
        hostId: 2,
        numOfGuests: 35,
        limit: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {cityId: 5,
        date: new Date(),
        time: new Date(),
        venue: "Mansion",
        address: "14 Silicon Way",
        name: "Classy Pants Get-together",
        description: "Fancy meeting some new citizens? Come to my mansion up on the hill and eat shrimp cocktail and sip on the finest tequila this side of the Mississippi has to offer.  Formal dresswear required.",
        hostId: 2,
        numOfGuests: 13,
        limit: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Events', null, {});
  }
};
