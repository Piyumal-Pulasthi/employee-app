"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("menus", [
      {
        name: "Pizza",
        restaurantId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Pasta",
        restaurantId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("menus", null, {});
  },
};
