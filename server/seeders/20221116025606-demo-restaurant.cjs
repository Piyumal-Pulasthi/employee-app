"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("restaurants", [
      {
        name: "John",
        location: "Colombo",
        open_time: "9 am",
        close_time: "10 pm",
        delivery_charge: 110,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("restaurants", null, {});
  },
};
