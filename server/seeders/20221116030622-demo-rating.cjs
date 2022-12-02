"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("ratings", [
      {
        rating: 4,
        comment: "This is a Good Pizza",
        dishId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        rating: 5,
        comment: "This is a Very Good Pizza",
        dishId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("ratings", null, {});
  },
};
