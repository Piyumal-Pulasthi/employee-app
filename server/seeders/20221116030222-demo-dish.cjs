"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("dishes", [
      {
        name: "Vegie Pizza",
        description: "This is a veggie Pizza",
        calories: "115c",
        price: 2500,
        menuId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Chicken Pizza",
        description: "This is a Chicken Pizza",
        calories: "215c",
        price: 3500,
        menuId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("dishes", null, {});
  },
};
